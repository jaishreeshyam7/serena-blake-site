# Automated Book Publication Workflow System

## Overview

This system provides a comprehensive automated book publication workflow that integrates web scraping, AI-powered content processing, reinforcement learning optimization, and human-in-the-loop feedback. The system is designed to fetch content from web sources, apply AI-driven "spinning" to chapters, allow for multiple human review iterations, and maintain version control with semantic search capabilities.

## Features

### Core Capabilities

1. **Web Scraping & Screenshots**
   - Automated content extraction from web URLs (specifically optimized for Wikisource)
   - Screenshot capture for content verification
   - RL-based reward system for scraping quality optimization

2. **AI Writing & Review**
   - Multi-agent AI system with Writer, Reviewer, and Editor roles
   - Support for multiple LLM providers (OpenAI GPT, Google Gemini)
   - Intelligent content "spinning" and enhancement
   - Quality assessment and reward scoring

3. **Human-in-the-Loop**
   - Interactive feedback system for human reviewers
   - Multiple iteration support with version tracking
   - Voice command integration for accessibility
   - Real-time workflow monitoring

4. **Reinforcement Learning Optimization**
   - Q-learning based reward system
   - Adaptive parameter tuning based on performance
   - Content quality optimization over time
   - Action selection optimization

5. **Semantic Search & Version Control**
   - ChromaDB integration for vector storage
   - Semantic search across all content
   - Version history tracking
   - Content similarity analysis

6. **Voice Support**
   - Voice command processing for workflow control
   - Speech-to-text feedback input
   - Text-to-speech status updates
   - Accessibility features

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Dashboard                           │
├─────────────────────────────────────────────────────────────────┤
│                     Next.js API Layer                          │
├─────────────────────────────────────────────────────────────────┤
│                 Workflow Orchestrator                          │
├─────────────────────────────────────────────────────────────────┤
│  Web Scraper  │  AI Agents  │  RL System  │  Voice Support    │
├─────────────────────────────────────────────────────────────────┤
│               ChromaDB Vector Database                          │
└─────────────────────────────────────────────────────────────────┘
```

### Key Classes

- **WorkflowOrchestrator**: Main coordinator for all workflow operations
- **WebScraper**: Handles content extraction and screenshot capture
- **AIAgentOrchestrator**: Manages AI agents for content processing
- **RLRewardSystem**: Implements reinforcement learning optimization
- **ChromaDBManager**: Handles vector storage and semantic search
- **VoiceCommandProcessor**: Processes voice commands and speech synthesis

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- ChromaDB server (optional, for semantic search)
- OpenAI API key (optional, for GPT models)
- Google AI API key (optional, for Gemini models)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-workflow-system
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

5. **Start ChromaDB (optional)**
   ```bash
   # Using Docker
   docker run -p 8000:8000 chromadb/chroma
   
   # Or using pip
   pip install chromadb
   chroma run --host 0.0.0.0 --port 8000
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

## Usage

### Starting a Workflow

1. **Open the dashboard** at `http://localhost:3000`

2. **Configure the workflow**:
   - Enter the source URL (e.g., `https://en.wikisource.org/wiki/The_Gates_of_Morning/Book_1/Chapter_1`)
   - Set the number of chapters to process
   - Enable/disable features:
     - Human-in-the-Loop: Require human review at each step
     - Voice Commands: Enable voice control
     - RL Optimization: Use reinforcement learning for optimization

3. **Start the workflow** by clicking "Start Workflow"

### Workflow Stages

1. **Scraping Stage**: Content is extracted from the source URL
2. **AI Processing Stage**: AI agents process the content
3. **Human Review Stage** (if enabled): Human reviewers provide feedback
4. **Optimization Stage**: RL system optimizes based on feedback
5. **Storage Stage**: Final content is stored in ChromaDB

### Human-in-the-Loop

When human-in-the-loop is enabled:

1. **Review Request**: System pauses and requests human feedback
2. **Feedback Input**: Provide feedback through the web interface or voice commands
3. **Rating**: Rate the content quality (1-10 scale)
4. **Suggestions**: Provide specific improvement suggestions
5. **Reprocessing**: AI agents reprocess based on feedback

### Voice Commands

Supported voice commands:
- "Pause workflow" - Pause the current workflow
- "Resume workflow" - Resume a paused workflow
- "Skip chapter" - Skip the current chapter
- "Feedback [content]" - Provide feedback via voice
- "Rate [number]" - Rate the current content
- "Approve" - Approve the current content
- "Reject" - Reject the current content

### Semantic Search

Use the search functionality to:
- Find similar content across all processed books
- Search for specific topics or themes
- Filter by content status, quality score, or other metadata
- Analyze content relationships and patterns

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: OpenAI API key for GPT models
- `GOOGLE_API_KEY`: Google AI API key for Gemini models
- `CHROMA_HOST`: ChromaDB server URL
- `PLAYWRIGHT_HEADLESS`: Run browser in headless mode
- `RL_LEARNING_RATE`: Learning rate for RL system
- `RL_DISCOUNT_FACTOR`: Discount factor for RL system
- `RL_EPSILON`: Exploration factor for RL system

### AI Agent Configuration

Customize AI agents through the system:

```typescript
const writerConfig: AgentConfig = {
  name: 'Creative Writer',
  role: 'writer',
  model: 'gpt-3.5-turbo',
  temperature: 0.8,
  maxTokens: 2000,
  systemPrompt: 'You are a creative writer...',
  enabled: true
};
```

### RL System Configuration

Tune the reinforcement learning system:

```typescript
const rlSystem = new RLRewardSystem(
  0.1,  // learning rate
  0.95, // discount factor
  0.1   // epsilon (exploration)
);
```

## API Endpoints

### Workflow Management

- `POST /api/workflow` - Start a new workflow
- `GET /api/workflow` - Get workflow status
- `PUT /api/workflow` - Update workflow (pause/resume/feedback)

### Search

- `GET /api/search` - Perform semantic search
- `POST /api/search` - Advanced search with filters

### Metrics

- `GET /api/metrics` - Get system performance metrics
- `POST /api/metrics` - Export data or get specific metrics

## Performance Metrics

The system tracks various performance metrics:

### RL Performance
- Average reward score
- Best/worst reward scores
- Recent performance trend
- Learning progress

### Content Statistics
- Total books processed
- Total chapters processed
- Average quality scores
- Processing time metrics

### System Health
- Active workflows
- Queued feedback
- Error rates
- Resource usage

## Troubleshooting

### Common Issues

1. **ChromaDB Connection Error**
   - Ensure ChromaDB server is running
   - Check `CHROMA_HOST` environment variable
   - Verify network connectivity

2. **AI Model Errors**
   - Verify API keys are correct
   - Check API quotas and limits
   - Ensure model names are valid

3. **Voice Recognition Issues**
   - Check browser permissions for microphone
   - Ensure HTTPS connection for voice features
   - Verify browser compatibility

4. **Playwright Browser Issues**
   - Install browsers: `npx playwright install`
   - Check system dependencies
   - Verify headless mode configuration

### Performance Optimization

1. **Batch Processing**: Process multiple chapters in parallel
2. **Caching**: Implement content caching for repeated operations
3. **Database Optimization**: Tune ChromaDB for large datasets
4. **Resource Management**: Monitor memory usage for large workflows

## Development

### Project Structure

```
├── app/
│   ├── api/          # API routes
│   └── page.tsx      # Main page
├── components/       # React components
├── lib/             # Core system modules
│   ├── types.ts     # TypeScript definitions
│   ├── scraper.ts   # Web scraping
│   ├── ai-agents.ts # AI agent system
│   ├── rl-reward-system.ts # RL optimization
│   ├── chroma-db.ts # Vector database
│   ├── voice-support.ts # Voice processing
│   └── workflow-orchestrator.ts # Main orchestrator
└── public/          # Static assets
```

### Adding New Features

1. **New AI Agent**: Extend `AIAgent` class with custom logic
2. **New Search Filter**: Add to `ChromaDBManager` search methods
3. **New Voice Command**: Add pattern to `VoiceCommandProcessor`
4. **New Workflow Stage**: Extend `WorkflowOrchestrator` with new stage

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Security Considerations

- API keys should be stored securely
- Content validation should be implemented
- Rate limiting should be applied to API endpoints
- User input should be sanitized
- Voice data should be processed securely

## Future Enhancements

- Integration with more LLM providers
- Advanced workflow templates
- Collaborative editing features
- Mobile app support
- Analytics dashboard
- Content publication pipeline
- Multi-language support
- Advanced voice processing

## Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

---

**Note**: This system is designed for educational and research purposes. Ensure compliance with content source terms of service and applicable laws when using for content processing.