import { NextRequest, NextResponse } from 'next/server';
import { WorkflowOrchestrator } from '@/lib/workflow-orchestrator';

const orchestrator = new WorkflowOrchestrator();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const filters = searchParams.get('filters');
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Initialize orchestrator if not already done
    await orchestrator.initialize();

    // Parse filters if provided
    let parsedFilters: Record<string, any> | undefined;
    if (filters) {
      try {
        parsedFilters = JSON.parse(filters);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid filters format' }, { status: 400 });
      }
    }

    // Perform semantic search
    const results = await orchestrator.searchContent(query, parsedFilters);

    return NextResponse.json({ 
      success: true, 
      results,
      query,
      filters: parsedFilters 
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json({ 
      error: 'Failed to perform search',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, filters, limit } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Initialize orchestrator if not already done
    await orchestrator.initialize();

    // Perform semantic search
    const results = await orchestrator.searchContent(query, filters);

    return NextResponse.json({ 
      success: true, 
      results,
      query,
      filters,
      limit
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json({ 
      error: 'Failed to perform search',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}