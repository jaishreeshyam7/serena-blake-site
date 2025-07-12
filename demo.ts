#!/usr/bin/env tsx

/**
 * Demo script for the Automated Book Publication Workflow System
 * 
 * This script demonstrates how to use the system programmatically
 * to process a book from a web source with AI enhancement and
 * human-in-the-loop feedback.
 */

import { WorkflowOrchestrator } from './lib/workflow-orchestrator';
import { WebScraper } from './lib/scraper';
import { AIAgentOrchestrator } from './lib/ai-agents';
import { ChromaDBManager } from './lib/chroma-db';
import { RLRewardSystem } from './lib/rl-reward-system';
import { VoiceCommandProcessor } from './lib/voice-support';

async function demonstrateWorkflow() {
  console.log('🚀 Starting Book Publication Workflow Demo');
  console.log('=' .repeat(50));

  // Initialize the workflow orchestrator
  const orchestrator = new WorkflowOrchestrator();
  
  try {
    // Initialize all components
    console.log('📚 Initializing workflow orchestrator...');
    await orchestrator.initialize();
    
    // Demo configuration
    const sourceUrl = 'https://en.wikisource.org/wiki/The_Gates_of_Morning/Book_1/Chapter_1';
    const workflowOptions = {
      chapterCount: 1,
      humanInLoop: false, // Set to true for interactive demo
      voiceEnabled: false,
      rlEnabled: true
    };

    console.log(`📖 Source URL: ${sourceUrl}`);
    console.log(`📋 Options:`, workflowOptions);
    console.log('');

    // Start the workflow
    console.log('🏃 Starting workflow...');
    const bookId = await orchestrator.startWorkflow(sourceUrl, workflowOptions);
    console.log(`✅ Workflow started with Book ID: ${bookId}`);
    
    // Monitor workflow progress
    let isComplete = false;
    let previousStage = '';
    
    while (!isComplete) {
      const status = await orchestrator.getWorkflowStatus();
      
      if (status) {
        if (status.currentStage !== previousStage) {
          console.log(`📝 Stage: ${status.currentStage.replace('_', ' ').toUpperCase()}`);
          console.log(`📊 Progress: ${status.currentChapter}/${status.totalChapters} chapters`);
          previousStage = status.currentStage;
        }
        
        if (status.currentStage === 'approved' || status.currentStage === 'published') {
          isComplete = true;
        }
      }
      
      // Wait 2 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('✅ Workflow completed successfully!');
    
    // Get performance metrics
    console.log('\n📊 Performance Metrics:');
    console.log('=' .repeat(30));
    const metrics = await orchestrator.getPerformanceMetrics();
    
    console.log(`📈 RL Average Reward: ${metrics.rlStats.averageReward.toFixed(2)}`);
    console.log(`📚 Total Books: ${metrics.contentStats.totalBooks}`);
    console.log(`📄 Total Chapters: ${metrics.contentStats.totalChapters}`);
    console.log(`⭐ Average Quality Score: ${metrics.contentStats.averageRewardScore.toFixed(2)}`);
    
    // Demonstrate search functionality
    console.log('\n🔍 Demonstrating Semantic Search:');
    console.log('=' .repeat(35));
    
    const searchQueries = [
      'morning light',
      'character development',
      'narrative structure'
    ];
    
    for (const query of searchQueries) {
      console.log(`🔎 Searching for: "${query}"`);
      const searchResults = await orchestrator.searchContent(query);
      console.log(`   Found ${searchResults.chapters?.length || 0} relevant chapters`);
      console.log(`   Relevance Score: ${((searchResults.relevanceScore || 0) * 100).toFixed(1)}%`);
    }
    
    // Export the processed book
    console.log('\n📤 Exporting processed book...');
    const exportData = await orchestrator.exportBook(bookId);
    console.log(`✅ Book exported successfully`);
    console.log(`📋 Export contains ${exportData.book.chapters?.length || 0} chapters`);
    
  } catch (error) {
    console.error('❌ Error in demonstration:', error);
  } finally {
    // Clean up
    console.log('\n🧹 Cleaning up resources...');
    await orchestrator.cleanup();
    console.log('✅ Demo completed!');
  }
}

async function demonstrateIndividualComponents() {
  console.log('\n🔧 Demonstrating Individual Components');
  console.log('=' .repeat(40));

  // Web Scraper Demo
  console.log('\n1. 🕷️  Web Scraper Demo:');
  const scraper = new WebScraper();
  await scraper.initialize();
  
  try {
    const scrapingResult = await scraper.scrapeChapter(
      'https://en.wikisource.org/wiki/The_Gates_of_Morning/Book_1/Chapter_1'
    );
    console.log(`   ✅ Scraped: ${scrapingResult.title}`);
    console.log(`   📝 Word count: ${scrapingResult.metadata.wordCount}`);
    console.log(`   📸 Screenshots: ${scrapingResult.screenshots.length}`);
  } catch (error) {
    console.log(`   ❌ Scraping failed: ${error}`);
  }
  
  await scraper.close();

  // AI Agents Demo
  console.log('\n2. 🤖 AI Agents Demo:');
  const aiOrchestrator = new AIAgentOrchestrator();
  
  // Note: This requires valid API keys
  console.log('   📝 AI agents configured:');
  const agents = aiOrchestrator.getAllAgents();
  for (const [name, agent] of agents) {
    const config = agent.getConfig();
    console.log(`   - ${config.name} (${config.model})`);
  }

  // RL System Demo
  console.log('\n3. 🧠 RL System Demo:');
  const rlSystem = new RLRewardSystem();
  
  // Simulate some rewards
  for (let i = 0; i < 5; i++) {
    await rlSystem.storeReward({
      id: `reward_${i}`,
      chapterId: 'demo_chapter',
      action: 'process_content',
      reward: Math.random() * 100,
      state: { iteration: i },
      nextState: { iteration: i + 1 },
      timestamp: new Date()
    });
  }
  
  const stats = rlSystem.getRewardStats();
  console.log(`   📊 Average Reward: ${stats.averageReward.toFixed(2)}`);
  console.log(`   📈 Best Reward: ${stats.bestReward.toFixed(2)}`);
  console.log(`   📉 Worst Reward: ${stats.worstReward.toFixed(2)}`);

  // Voice Support Demo
  console.log('\n4. 🎤 Voice Support Demo:');
  const voiceProcessor = new VoiceCommandProcessor();
  await voiceProcessor.initialize();
  
  const availableCommands = voiceProcessor.getAvailableCommands();
  console.log('   🎯 Available voice commands:');
  availableCommands.forEach(command => {
    console.log(`   - ${command}`);
  });
  
  await voiceProcessor.cleanup();

  // ChromaDB Demo
  console.log('\n5. 🗄️  ChromaDB Demo:');
  const chromaDB = new ChromaDBManager();
  
  try {
    await chromaDB.initialize();
    const stats = await chromaDB.getContentStatistics();
    console.log(`   📚 Total Books: ${stats.totalBooks}`);
    console.log(`   📄 Total Chapters: ${stats.totalChapters}`);
    console.log(`   🔄 Total Versions: ${stats.totalVersions}`);
    
    await chromaDB.close();
  } catch (error) {
    console.log(`   ⚠️  ChromaDB not available: ${error}`);
  }
}

async function interactiveDemo() {
  console.log('\n🎮 Interactive Demo Mode');
  console.log('=' .repeat(25));
  console.log('This would start an interactive demo with human-in-the-loop feedback.');
  console.log('To enable interactive mode, set humanInLoop: true in the workflow options.');
  console.log('The system will pause at each stage to request human feedback.');
  console.log('');
  console.log('Interactive features:');
  console.log('- 💬 Text-based feedback input');
  console.log('- 🎤 Voice command support');
  console.log('- ⭐ Content rating system');
  console.log('- 🔄 Iterative improvement process');
  console.log('- 📊 Real-time quality metrics');
}

async function main() {
  console.log('🎯 Book Publication Workflow System Demo');
  console.log('🔬 Educational and Research Purposes Only');
  console.log('');
  
  // Check if running in demo mode
  const args = process.argv.slice(2);
  const mode = args[0] || 'full';
  
  switch (mode) {
    case 'full':
      await demonstrateWorkflow();
      break;
    case 'components':
      await demonstrateIndividualComponents();
      break;
    case 'interactive':
      await interactiveDemo();
      break;
    default:
      console.log('Usage: npm run demo [full|components|interactive]');
      console.log('');
      console.log('Modes:');
      console.log('  full         - Complete workflow demonstration');
      console.log('  components   - Individual component demonstrations');
      console.log('  interactive  - Interactive mode with human feedback');
  }
}

// Run the demo
if (require.main === module) {
  main().catch(console.error);
}

export { demonstrateWorkflow, demonstrateIndividualComponents, interactiveDemo };