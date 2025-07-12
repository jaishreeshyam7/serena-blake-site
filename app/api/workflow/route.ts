import { NextRequest, NextResponse } from 'next/server';
import { WorkflowOrchestrator } from '@/lib/workflow-orchestrator';

const orchestrator = new WorkflowOrchestrator();

export async function POST(request: NextRequest) {
  try {
    const { sourceUrl, options } = await request.json();
    
    if (!sourceUrl) {
      return NextResponse.json({ error: 'Source URL is required' }, { status: 400 });
    }

    // Initialize orchestrator if not already done
    await orchestrator.initialize();

    // Start workflow
    const bookId = await orchestrator.startWorkflow(sourceUrl, options);

    return NextResponse.json({ 
      success: true, 
      bookId,
      message: 'Workflow started successfully' 
    });
  } catch (error) {
    console.error('Error starting workflow:', error);
    return NextResponse.json({ 
      error: 'Failed to start workflow',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');
    
    if (bookId) {
      // Get specific book content
      const bookContent = await orchestrator.getBookContent(bookId);
      return NextResponse.json({ bookContent });
    } else {
      // Get workflow status
      const status = await orchestrator.getWorkflowStatus();
      return NextResponse.json({ status });
    }
  } catch (error) {
    console.error('Error getting workflow info:', error);
    return NextResponse.json({ 
      error: 'Failed to get workflow info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { action, data } = await request.json();
    
    switch (action) {
      case 'pause':
        await orchestrator.pauseWorkflow();
        return NextResponse.json({ message: 'Workflow paused' });
      
      case 'resume':
        await orchestrator.resumeWorkflow();
        return NextResponse.json({ message: 'Workflow resumed' });
      
      case 'feedback':
        orchestrator.emit('human_feedback', data);
        return NextResponse.json({ message: 'Feedback submitted' });
      
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json({ 
      error: 'Failed to update workflow',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}