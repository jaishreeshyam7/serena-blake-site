import { WebScraper } from './scraper';
import { AIAgentOrchestrator } from './ai-agents';
import { ChromaDBManager } from './chroma-db';
import { RLRewardSystem } from './rl-reward-system';
import { VoiceCommandProcessor } from './voice-support';
import { 
  BookContent, 
  Chapter, 
  ChapterStatus, 
  WorkflowState, 
  HumanFeedback, 
  ScrapingResult 
} from './types';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';

export class WorkflowOrchestrator extends EventEmitter {
  private scraper: WebScraper;
  private aiOrchestrator: AIAgentOrchestrator;
  private chromaDB: ChromaDBManager;
  private rlSystem: RLRewardSystem;
  private voiceProcessor: VoiceCommandProcessor;
  private currentWorkflow: WorkflowState | null = null;
  private humanFeedbackQueue: Map<string, HumanFeedback[]> = new Map();
  
  constructor() {
    super();
    this.scraper = new WebScraper();
    this.aiOrchestrator = new AIAgentOrchestrator();
    this.chromaDB = new ChromaDBManager();
    this.rlSystem = new RLRewardSystem();
    this.voiceProcessor = new VoiceCommandProcessor();
    
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.voiceProcessor.on('command', (command) => {
      this.handleVoiceCommand(command);
    });

    this.on('human_feedback', (feedback) => {
      this.handleHumanFeedback(feedback);
    });
  }

  async initialize(): Promise<void> {
    try {
      await Promise.all([
        this.scraper.initialize(),
        this.chromaDB.initialize(),
        this.voiceProcessor.initialize()
      ]);
      console.log('Workflow orchestrator initialized successfully');
    } catch (error) {
      console.error('Error initializing workflow orchestrator:', error);
      throw error;
    }
  }

  async startWorkflow(sourceUrl: string, options: {
    chapterCount?: number;
    humanInLoop?: boolean;
    voiceEnabled?: boolean;
    rlEnabled?: boolean;
  } = {}): Promise<string> {
    const bookId = uuidv4();
    
    this.currentWorkflow = {
      bookId,
      currentChapter: 0,
      totalChapters: options.chapterCount || 1,
      currentStage: ChapterStatus.SCRAPED,
      humanInLoop: options.humanInLoop || false,
      voiceEnabled: options.voiceEnabled || false,
      rlEnabled: options.rlEnabled || true
    };

    try {
      this.emit('workflow_started', { bookId, sourceUrl });
      
      // Stage 1: Scrape content
      const scrapingResults = await this.scrapeContent(sourceUrl, options.chapterCount || 1);
      
      // Stage 2: Create book structure
      const book = await this.createBookFromScrapingResults(scrapingResults, bookId);
      
      // Stage 3: AI processing with human-in-the-loop
      const processedBook = await this.processBookWithAI(book);
      
      // Stage 4: Store in ChromaDB
      await this.chromaDB.storeBook(processedBook);
      
      this.emit('workflow_completed', { bookId, book: processedBook });
      
      return bookId;
    } catch (error) {
      this.emit('workflow_error', { bookId, error });
      throw error;
    }
  }

  private async scrapeContent(sourceUrl: string, chapterCount: number): Promise<ScrapingResult[]> {
    this.emit('stage_started', { stage: 'scraping', chapterCount });
    
    const results = await this.scraper.scrapeMultipleChapters(sourceUrl, chapterCount);
    
    this.emit('stage_completed', { stage: 'scraping', results: results.length });
    
    return results;
  }

  private async createBookFromScrapingResults(results: ScrapingResult[], bookId: string): Promise<BookContent> {
    const chapters: Chapter[] = results.map((result, index) => ({
      id: uuidv4(),
      title: result.title,
      content: result.content,
      originalContent: result.content,
      version: 1,
      status: ChapterStatus.SCRAPED,
      aiSpinHistory: [],
      humanFeedback: [],
      rewardScore: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const book: BookContent = {
      id: bookId,
      title: results[0]?.title || 'Untitled Book',
      chapters,
      metadata: {
        sourceUrl: results[0]?.url || '',
        author: 'Unknown',
        genre: 'Fiction',
        description: 'AI-processed book content',
        language: 'en',
        estimatedReadingTime: results.reduce((sum, r) => sum + r.metadata.wordCount, 0) / 200 // Assuming 200 WPM
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return book;
  }

  private async processBookWithAI(book: BookContent): Promise<BookContent> {
    const processedBook = { ...book };
    
    for (let i = 0; i < processedBook.chapters.length; i++) {
      if (this.currentWorkflow) {
        this.currentWorkflow.currentChapter = i;
        this.currentWorkflow.currentStage = ChapterStatus.AI_SPINNING;
      }
      
      this.emit('chapter_processing_started', { 
        chapterIndex: i, 
        chapterTitle: processedBook.chapters[i].title 
      });
      
      // Check for human feedback
      let humanFeedback: HumanFeedback[] = [];
      if (this.currentWorkflow?.humanInLoop) {
        humanFeedback = await this.waitForHumanFeedback(processedBook.chapters[i].id);
      }
      
      // Process with AI agents
      const processedChapter = await this.aiOrchestrator.processChapter(
        processedBook.chapters[i], 
        humanFeedback
      );
      
      processedChapter.status = ChapterStatus.AI_REVIEW;
      processedBook.chapters[i] = processedChapter;
      
      // Human review stage
      if (this.currentWorkflow?.humanInLoop) {
        processedChapter.status = ChapterStatus.HUMAN_REVIEW;
        const reviewFeedback = await this.waitForHumanFeedback(processedChapter.id);
        processedChapter.humanFeedback.push(...reviewFeedback);
        
        // Re-process if needed based on feedback
        if (reviewFeedback.some(f => f.rating < 7)) {
          const reprocessedChapter = await this.aiOrchestrator.processChapter(
            processedChapter, 
            reviewFeedback
          );
          processedBook.chapters[i] = reprocessedChapter;
        }
      }
      
      processedBook.chapters[i].status = ChapterStatus.APPROVED;
      
      this.emit('chapter_processing_completed', { 
        chapterIndex: i, 
        rewardScore: processedBook.chapters[i].rewardScore 
      });
      
      // Optimize agents based on performance
      await this.aiOrchestrator.optimizeAgents();
    }
    
    processedBook.updatedAt = new Date();
    return processedBook;
  }

  private async waitForHumanFeedback(chapterId: string): Promise<HumanFeedback[]> {
    return new Promise((resolve) => {
      this.emit('human_feedback_requested', { chapterId });
      
      // Set up timeout for human feedback
      const timeout = setTimeout(() => {
        resolve(this.humanFeedbackQueue.get(chapterId) || []);
      }, 30000); // 30 second timeout
      
      const checkFeedback = () => {
        const feedback = this.humanFeedbackQueue.get(chapterId);
        if (feedback && feedback.length > 0) {
          clearTimeout(timeout);
          this.humanFeedbackQueue.delete(chapterId);
          resolve(feedback);
        } else {
          setTimeout(checkFeedback, 1000);
        }
      };
      
      checkFeedback();
    });
  }

  private handleHumanFeedback(feedback: HumanFeedback): void {
    const existingFeedback = this.humanFeedbackQueue.get(feedback.id) || [];
    existingFeedback.push(feedback);
    this.humanFeedbackQueue.set(feedback.id, existingFeedback);
  }

  private handleVoiceCommand(command: any): void {
    // Handle voice commands for workflow control
    switch (command.action) {
      case 'pause_workflow':
        this.emit('workflow_paused');
        break;
      case 'resume_workflow':
        this.emit('workflow_resumed');
        break;
      case 'skip_chapter':
        this.emit('chapter_skipped');
        break;
      case 'provide_feedback':
        this.handleVoiceFeedback(command);
        break;
      default:
        console.warn('Unknown voice command:', command);
    }
  }

  private handleVoiceFeedback(command: any): void {
    const feedback: HumanFeedback = {
      id: uuidv4(),
      userId: command.userId || 'voice_user',
      type: command.feedbackType || 'reviewer',
      feedback: command.transcript,
      rating: command.rating || 5,
      suggestions: command.suggestions || [],
      timestamp: new Date()
    };
    
    this.handleHumanFeedback(feedback);
  }

  async pauseWorkflow(): Promise<void> {
    this.emit('workflow_paused');
  }

  async resumeWorkflow(): Promise<void> {
    this.emit('workflow_resumed');
  }

  async getWorkflowStatus(): Promise<WorkflowState | null> {
    return this.currentWorkflow;
  }

  async getBookContent(bookId: string): Promise<any> {
    return this.chromaDB.searchSimilarContent(bookId, 1);
  }

  async searchContent(query: string, filters?: Record<string, any>): Promise<any> {
    return this.chromaDB.semanticSearch(query, filters);
  }

  async exportBook(bookId: string): Promise<{
    book: any;
    statistics: any;
  }> {
    const bookData = await this.getBookContent(bookId);
    const statistics = await this.chromaDB.getContentStatistics();
    
    return {
      book: bookData,
      statistics
    };
  }

  async getPerformanceMetrics(): Promise<{
    rlStats: any;
    contentStats: any;
    processingStats: any;
  }> {
    const rlStats = this.rlSystem.getRewardStats();
    const contentStats = await this.chromaDB.getContentStatistics();
    const processingStats = {
      currentWorkflow: this.currentWorkflow,
      queuedFeedback: this.humanFeedbackQueue.size
    };
    
    return {
      rlStats,
      contentStats,
      processingStats
    };
  }

  async cleanup(): Promise<void> {
    await Promise.all([
      this.scraper.close(),
      this.chromaDB.close(),
      this.voiceProcessor.cleanup()
    ]);
  }
}

export default WorkflowOrchestrator;