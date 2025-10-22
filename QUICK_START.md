# Quick Start Guide

## Automated Book Publication Workflow System

### 🚀 Get Started in 5 Minutes

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Installation

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Install browser dependencies for web scraping
npm run install-browsers

# 3. Copy environment configuration
cp .env.example .env
```

#### Basic Usage

##### Option 1: Web Dashboard (Recommended)
```bash
# Start the web application
npm run dev

# Open http://localhost:3000 in your browser
```

##### Option 2: Command Line Demo
```bash
# Run the full demo
npm run demo

# Or run individual component demos
npm run demo:components

# Or run interactive demo
npm run demo:interactive
```

### 📖 Example Workflow

1. **Open the dashboard** at `http://localhost:3000`

2. **Configure your workflow**:
   - Source URL: `https://en.wikisource.org/wiki/The_Gates_of_Morning/Book_1/Chapter_1`
   - Chapter Count: `1` (start small)
   - Enable features as needed

3. **Click "Start Workflow"** and watch the magic happen!

### 🎯 Key Features

- **Web Scraping**: Automatically extracts content from web pages
- **AI Processing**: Enhances content using multiple AI agents
- **Human Review**: Optional human feedback loop
- **Voice Commands**: Control the system with voice
- **Semantic Search**: Find content using natural language
- **RL Optimization**: Learns and improves over time

### 🔧 Configuration (Optional)

For advanced features, configure these in your `.env` file:

```env
# For AI features
OPENAI_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here

# For semantic search
CHROMA_HOST=http://localhost:8000
```

### 🎮 Demo Modes

- **Full Demo**: Complete workflow demonstration
- **Components Demo**: Individual component testing
- **Interactive Demo**: Human-in-the-loop experience

### 🆘 Troubleshooting

#### Common Issues:
1. **Package Installation Errors**: Use `--legacy-peer-deps` flag
2. **Browser Not Found**: Run `npm run install-browsers`
3. **API Errors**: Check your API keys in `.env`

#### Need Help?
- Check the [full documentation](BOOK_WORKFLOW_README.md)
- Review the troubleshooting section
- Test individual components with `npm run demo:components`

### 📚 Next Steps

1. **Explore the Dashboard**: Try different configurations
2. **Enable AI Features**: Add your API keys for enhanced processing
3. **Try Voice Commands**: Enable voice control for hands-free operation
4. **Set Up ChromaDB**: For semantic search capabilities
5. **Read the Full Docs**: Comprehensive guide available

### 🎉 That's It!

You're ready to start processing books with AI! The system will:
- Scrape content from web sources
- Apply AI enhancements
- Allow human review (optional)
- Store results with semantic search
- Optimize performance over time

Happy book processing! 📚✨