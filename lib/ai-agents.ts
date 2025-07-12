import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AgentConfig, AISpinRecord, Chapter, HumanFeedback } from './types';
import { RLRewardSystem } from './rl-reward-system';
import { v4 as uuidv4 } from 'uuid';

export class AIAgent {
  private config: AgentConfig;
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private rlSystem: RLRewardSystem;

  constructor(config: AgentConfig, rlSystem: RLRewardSystem) {
    this.config = config;
    this.rlSystem = rlSystem;
    this.initializeModels();
  }

  private initializeModels(): void {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    if (process.env.GOOGLE_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    }
  }

  async spinContent(originalContent: string, humanFeedback?: HumanFeedback[]): Promise<AISpinRecord> {
    const prompt = this.buildPrompt(originalContent, humanFeedback);
    
    try {
      const startTime = Date.now();
      const response = await this.generateContent(prompt);
      const processingTime = Date.now() - startTime;
      
      const record: AISpinRecord = {
        id: uuidv4(),
        agentType: this.config.role,
        model: this.config.model,
        prompt,
        response,
        rewardScore: 0,
        timestamp: new Date(),
        metadata: {
          processingTime,
          originalLength: originalContent.length,
          newLength: response.length,
          model: this.config.model,
          temperature: this.config.temperature
        }
      };

      // Calculate reward based on content quality and processing efficiency
      const contentQuality = this.assessContentQuality(originalContent, response);
      const humanFeedbackScore = this.calculateHumanFeedbackScore(humanFeedback);
      const reward = this.rlSystem.calculateReward(
        contentQuality,
        humanFeedbackScore,
        processingTime,
        0 // No errors in successful generation
      );

      record.rewardScore = reward;

      // Store RL reward
      await this.rlSystem.storeReward({
        id: uuidv4(),
        chapterId: uuidv4(),
        action: `${this.config.role}_spin`,
        reward,
        state: { 
          originalLength: originalContent.length,
          role: this.config.role,
          model: this.config.model 
        },
        nextState: { 
          newLength: response.length,
          quality: contentQuality,
          completed: true 
        },
        timestamp: new Date()
      });

      return record;
    } catch (error) {
      console.error(`Error in ${this.config.role} agent:`, error);
      throw error;
    }
  }

  private buildPrompt(originalContent: string, humanFeedback?: HumanFeedback[]): string {
    let prompt = this.config.systemPrompt + '\n\n';
    
    if (this.config.role === 'writer') {
      prompt += `Please rewrite the following content in a creative and engaging way while maintaining the core story and meaning. Make it more vivid and compelling:\n\n${originalContent}`;
    } else if (this.config.role === 'reviewer') {
      prompt += `Please review the following content and provide constructive feedback, suggestions for improvement, and identify any issues:\n\n${originalContent}`;
    } else if (this.config.role === 'editor') {
      prompt += `Please edit the following content for grammar, style, flow, and overall quality. Make specific improvements:\n\n${originalContent}`;
    }

    if (humanFeedback && humanFeedback.length > 0) {
      prompt += '\n\nPrevious human feedback to consider:\n';
      humanFeedback.forEach(feedback => {
        prompt += `- ${feedback.feedback}\n`;
        if (feedback.suggestions.length > 0) {
          prompt += `  Suggestions: ${feedback.suggestions.join(', ')}\n`;
        }
      });
    }

    return prompt;
  }

  private async generateContent(prompt: string): Promise<string> {
    if (this.config.model.includes('gpt') && this.openai) {
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
      });

      return response.choices[0]?.message?.content || '';
    } else if (this.config.model.includes('gemini') && this.gemini) {
      const model = this.gemini.getGenerativeModel({ model: this.config.model });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    }

    throw new Error(`Unsupported model: ${this.config.model}`);
  }

  private assessContentQuality(original: string, generated: string): number {
    let quality = 50; // Base quality score
    
    // Length comparison
    const originalWords = original.split(' ').length;
    const generatedWords = generated.split(' ').length;
    const lengthRatio = generatedWords / originalWords;
    
    if (lengthRatio > 0.8 && lengthRatio < 1.5) {
      quality += 20; // Good length ratio
    } else if (lengthRatio < 0.5 || lengthRatio > 2) {
      quality -= 20; // Poor length ratio
    }
    
    // Vocabulary richness
    const originalVocab = new Set(original.toLowerCase().split(/\W+/));
    const generatedVocab = new Set(generated.toLowerCase().split(/\W+/));
    const vocabGrowth = (generatedVocab.size - originalVocab.size) / originalVocab.size;
    
    if (vocabGrowth > 0.1) {
      quality += 15; // Vocabulary expansion
    }
    
    // Sentence structure variety
    const sentences = generated.split(/[.!?]+/).filter(s => s.trim());
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(' ').length, 0) / sentences.length;
    
    if (avgSentenceLength > 10 && avgSentenceLength < 25) {
      quality += 10; // Good sentence length variety
    }
    
    // Penalize repetitive content
    const words = generated.toLowerCase().split(/\W+/);
    const wordFreq = new Map();
    words.forEach(word => {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    });
    
    const repetitiveWords = Array.from(wordFreq.values()).filter(count => count > words.length * 0.05);
    if (repetitiveWords.length > 0) {
      quality -= repetitiveWords.length * 5;
    }
    
    return Math.max(0, Math.min(100, quality));
  }

  private calculateHumanFeedbackScore(humanFeedback?: HumanFeedback[]): number {
    if (!humanFeedback || humanFeedback.length === 0) return 5; // Neutral score
    
    const totalRating = humanFeedback.reduce((sum, feedback) => sum + feedback.rating, 0);
    return totalRating / humanFeedback.length;
  }

  updateConfig(newConfig: Partial<AgentConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.model) {
      this.initializeModels();
    }
  }

  getConfig(): AgentConfig {
    return { ...this.config };
  }

  async evaluatePerformance(): Promise<{
    averageReward: number;
    totalProcessed: number;
    successRate: number;
    averageProcessingTime: number;
  }> {
    const stats = this.rlSystem.getRewardStats();
    
    return {
      averageReward: stats.averageReward,
      totalProcessed: stats.totalRewards > 0 ? 1 : 0, // Simplified for demo
      successRate: stats.averageReward > 50 ? 0.8 : 0.5, // Simplified calculation
      averageProcessingTime: 2000 // Simplified for demo
    };
  }
}

export class AIAgentOrchestrator {
  private agents: Map<string, AIAgent> = new Map();
  private rlSystem: RLRewardSystem;

  constructor() {
    this.rlSystem = new RLRewardSystem();
    this.initializeDefaultAgents();
  }

  private initializeDefaultAgents(): void {
    const writerConfig: AgentConfig = {
      name: 'Creative Writer',
      role: 'writer',
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      maxTokens: 2000,
      systemPrompt: 'You are a creative writer who specializes in rewriting and enhancing stories. Make content more engaging, vivid, and compelling while maintaining the original meaning and story structure.',
      enabled: true
    };

    const reviewerConfig: AgentConfig = {
      name: 'Content Reviewer',
      role: 'reviewer',
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 1500,
      systemPrompt: 'You are a professional content reviewer. Provide constructive feedback, identify improvements, and ensure quality and consistency.',
      enabled: true
    };

    const editorConfig: AgentConfig = {
      name: 'Professional Editor',
      role: 'editor',
      model: 'gpt-4',
      temperature: 0.2,
      maxTokens: 2000,
      systemPrompt: 'You are a professional editor. Focus on grammar, style, flow, clarity, and overall quality. Make specific improvements to enhance readability.',
      enabled: true
    };

    this.agents.set('writer', new AIAgent(writerConfig, this.rlSystem));
    this.agents.set('reviewer', new AIAgent(reviewerConfig, this.rlSystem));
    this.agents.set('editor', new AIAgent(editorConfig, this.rlSystem));
  }

  async processChapter(chapter: Chapter, humanFeedback?: HumanFeedback[]): Promise<Chapter> {
    const updatedChapter = { ...chapter };
    
    // Writer spin
    if (this.agents.has('writer')) {
      const writerRecord = await this.agents.get('writer')!.spinContent(chapter.content, humanFeedback);
      updatedChapter.content = writerRecord.response;
      updatedChapter.aiSpinHistory.push(writerRecord);
    }
    
    // Reviewer feedback
    if (this.agents.has('reviewer')) {
      const reviewerRecord = await this.agents.get('reviewer')!.spinContent(updatedChapter.content, humanFeedback);
      updatedChapter.aiSpinHistory.push(reviewerRecord);
    }
    
    // Editor refinement
    if (this.agents.has('editor')) {
      const editorRecord = await this.agents.get('editor')!.spinContent(updatedChapter.content, humanFeedback);
      updatedChapter.content = editorRecord.response;
      updatedChapter.aiSpinHistory.push(editorRecord);
    }

    // Update reward score
    updatedChapter.rewardScore = updatedChapter.aiSpinHistory.reduce((sum, record) => sum + record.rewardScore, 0) / updatedChapter.aiSpinHistory.length;
    updatedChapter.version += 1;
    updatedChapter.updatedAt = new Date();

    return updatedChapter;
  }

  addAgent(key: string, config: AgentConfig): void {
    this.agents.set(key, new AIAgent(config, this.rlSystem));
  }

  removeAgent(key: string): void {
    this.agents.delete(key);
  }

  getAgent(key: string): AIAgent | undefined {
    return this.agents.get(key);
  }

  getAllAgents(): Map<string, AIAgent> {
    return new Map(this.agents);
  }

  async optimizeAgents(): Promise<void> {
    const performance = this.rlSystem.getRewardStats().averageReward / 100;
    this.rlSystem.optimizeParameters(performance);
    
    // Optimize individual agents based on performance
    for (const [key, agent] of this.agents) {
      const agentPerformance = await agent.evaluatePerformance();
      if (agentPerformance.averageReward < 50) {
        // Increase temperature for more creativity
        const config = agent.getConfig();
        agent.updateConfig({ temperature: Math.min(1.0, config.temperature + 0.1) });
      }
    }
  }
}

export default AIAgentOrchestrator;