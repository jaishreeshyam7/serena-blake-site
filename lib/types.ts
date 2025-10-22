export interface BookContent {
  id: string;
  title: string;
  chapters: Chapter[];
  metadata: BookMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  originalContent?: string;
  version: number;
  status: ChapterStatus;
  aiSpinHistory: AISpinRecord[];
  humanFeedback: HumanFeedback[];
  rewardScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookMetadata {
  sourceUrl: string;
  author: string;
  genre: string;
  description: string;
  language: string;
  estimatedReadingTime: number;
}

export enum ChapterStatus {
  SCRAPED = 'scraped',
  AI_SPINNING = 'ai_spinning',
  AI_REVIEW = 'ai_review',
  HUMAN_REVIEW = 'human_review',
  APPROVED = 'approved',
  PUBLISHED = 'published'
}

export interface AISpinRecord {
  id: string;
  agentType: 'writer' | 'reviewer' | 'editor';
  model: string;
  prompt: string;
  response: string;
  rewardScore: number;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface HumanFeedback {
  id: string;
  userId: string;
  type: 'writer' | 'reviewer' | 'editor';
  feedback: string;
  rating: number;
  suggestions: string[];
  timestamp: Date;
}

export interface RLReward {
  id: string;
  chapterId: string;
  action: string;
  reward: number;
  state: Record<string, any>;
  nextState: Record<string, any>;
  timestamp: Date;
}

export interface VoiceCommand {
  id: string;
  userId: string;
  command: string;
  transcript: string;
  action: string;
  timestamp: Date;
}

export interface AgentConfig {
  name: string;
  role: 'writer' | 'reviewer' | 'editor';
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  enabled: boolean;
}

export interface WorkflowState {
  bookId: string;
  currentChapter: number;
  totalChapters: number;
  currentStage: ChapterStatus;
  humanInLoop: boolean;
  voiceEnabled: boolean;
  rlEnabled: boolean;
}

export interface ScrapingResult {
  url: string;
  title: string;
  content: string;
  screenshots: string[];
  metadata: Record<string, any>;
  timestamp: Date;
}