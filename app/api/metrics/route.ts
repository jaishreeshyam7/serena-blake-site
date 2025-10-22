import { NextRequest, NextResponse } from 'next/server';
import { WorkflowOrchestrator } from '@/lib/workflow-orchestrator';

const orchestrator = new WorkflowOrchestrator();

export async function GET(request: NextRequest) {
  try {
    // Initialize orchestrator if not already done
    await orchestrator.initialize();

    // Get performance metrics
    const metrics = await orchestrator.getPerformanceMetrics();

    return NextResponse.json({ 
      success: true, 
      metrics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting metrics:', error);
    return NextResponse.json({ 
      error: 'Failed to get metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { bookId, action } = await request.json();
    
    // Initialize orchestrator if not already done
    await orchestrator.initialize();

    let result;
    switch (action) {
      case 'export':
        if (!bookId) {
          return NextResponse.json({ error: 'Book ID is required for export' }, { status: 400 });
        }
        result = await orchestrator.exportBook(bookId);
        break;
      
      case 'metrics':
        result = await orchestrator.getPerformanceMetrics();
        break;
      
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      result,
      action,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing metrics request:', error);
    return NextResponse.json({ 
      error: 'Failed to process metrics request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}