import { EventEmitter } from 'events';
import { VoiceCommand } from './types';
import { v4 as uuidv4 } from 'uuid';

export class VoiceCommandProcessor extends EventEmitter {
  private recognition: any = null;
  private synthesis: any = null;
  private isListening: boolean = false;
  private commandPatterns: Map<string, RegExp> = new Map();
  private currentUserId: string = 'default_user';

  constructor() {
    super();
    this.setupCommandPatterns();
  }

  private setupCommandPatterns(): void {
    // Define voice command patterns
    this.commandPatterns.set('pause_workflow', /pause\s+(workflow|work|process)/i);
    this.commandPatterns.set('resume_workflow', /resume\s+(workflow|work|process)/i);
    this.commandPatterns.set('skip_chapter', /skip\s+(chapter|this)/i);
    this.commandPatterns.set('provide_feedback', /feedback|review|comment/i);
    this.commandPatterns.set('start_recording', /start|begin|record/i);
    this.commandPatterns.set('stop_recording', /stop|end|finish/i);
    this.commandPatterns.set('approve_chapter', /approve|accept|good/i);
    this.commandPatterns.set('reject_chapter', /reject|deny|bad/i);
    this.commandPatterns.set('rate_chapter', /rate|score|rating/i);
  }

  async initialize(): Promise<void> {
    try {
      // Initialize Web Speech API if available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
      }

      if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        this.recognition = new (window as any).webkitSpeechRecognition();
        this.setupRecognition();
      } else if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
        this.recognition = new (window as any).SpeechRecognition();
        this.setupRecognition();
      } else {
        console.warn('Speech recognition not available in this environment');
      }

      console.log('Voice command processor initialized');
    } catch (error) {
      console.error('Error initializing voice support:', error);
      throw error;
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.emit('listening_started');
    };

    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        this.processVoiceCommand(finalTranscript);
      }

      this.emit('transcription_update', {
        final: finalTranscript,
        interim: interimTranscript
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.emit('recognition_error', event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.emit('listening_stopped');
    };
  }

  private processVoiceCommand(transcript: string): void {
    const command = this.parseCommand(transcript);
    
    if (command) {
      const voiceCommand: VoiceCommand = {
        id: uuidv4(),
        userId: this.currentUserId,
        command: command.action,
        transcript: transcript,
        action: command.action,
        timestamp: new Date()
      };

      this.emit('command', { ...voiceCommand, ...command.parameters });
    }
  }

  private parseCommand(transcript: string): { action: string; parameters: any } | null {
    const lowerTranscript = transcript.toLowerCase();

    for (const [action, pattern] of this.commandPatterns) {
      if (pattern.test(lowerTranscript)) {
        const parameters = this.extractParameters(lowerTranscript, action);
        return { action, parameters };
      }
    }

    return null;
  }

  private extractParameters(transcript: string, action: string): any {
    const parameters: any = {};

    switch (action) {
      case 'rate_chapter':
        const ratingMatch = transcript.match(/rate\s+(\d+)/i) || transcript.match(/(\d+)\s+out\s+of\s+\d+/i);
        if (ratingMatch) {
          parameters.rating = parseInt(ratingMatch[1]);
        }
        break;

      case 'provide_feedback':
        // Extract feedback content (everything after feedback keywords)
        const feedbackMatch = transcript.match(/feedback\s+(.+)/i) || transcript.match(/review\s+(.+)/i);
        if (feedbackMatch) {
          parameters.feedbackContent = feedbackMatch[1];
        }
        break;

      case 'skip_chapter':
        const reasonMatch = transcript.match(/skip.+because\s+(.+)/i);
        if (reasonMatch) {
          parameters.reason = reasonMatch[1];
        }
        break;
    }

    return parameters;
  }

  startListening(): void {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }

  speak(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}): void {
    if (!this.synthesis) {
      console.warn('Speech synthesis not available');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onstart = () => {
      this.emit('speech_started', { text });
    };

    utterance.onend = () => {
      this.emit('speech_ended', { text });
    };

    utterance.onerror = (event: any) => {
      console.error('Speech synthesis error:', event.error);
      this.emit('speech_error', event.error);
    };

    this.synthesis.speak(utterance);
  }

  setUserId(userId: string): void {
    this.currentUserId = userId;
  }

  addCommandPattern(action: string, pattern: RegExp): void {
    this.commandPatterns.set(action, pattern);
  }

  removeCommandPattern(action: string): void {
    this.commandPatterns.delete(action);
  }

  getAvailableCommands(): string[] {
    return Array.from(this.commandPatterns.keys());
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  enableContinuousListening(): void {
    if (this.recognition) {
      this.recognition.continuous = true;
    }
  }

  disableContinuousListening(): void {
    if (this.recognition) {
      this.recognition.continuous = false;
    }
  }

  setLanguage(language: string): void {
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  async provideFeedback(chapterId: string, feedbackType: 'writer' | 'reviewer' | 'editor'): Promise<void> {
    return new Promise((resolve) => {
      this.speak(`Please provide your ${feedbackType} feedback for this chapter.`);
      
      const handleFeedback = (command: any) => {
        if (command.action === 'provide_feedback') {
          this.emit('feedback_provided', {
            chapterId,
            feedbackType,
            feedback: command.feedbackContent || command.transcript,
            rating: command.rating || 5,
            timestamp: new Date()
          });
          this.removeListener('command', handleFeedback);
          resolve();
        }
      };

      this.on('command', handleFeedback);
      this.startListening();
    });
  }

  async cleanup(): Promise<void> {
    this.stopListening();
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    this.removeAllListeners();
  }
}

export default VoiceCommandProcessor;