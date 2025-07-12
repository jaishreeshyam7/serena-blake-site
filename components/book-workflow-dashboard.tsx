'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Search, 
  Upload, 
  Download, 
  Mic, 
  MicOff,
  Settings,
  Activity,
  FileText,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Users
} from 'lucide-react';

interface WorkflowStatus {
  bookId: string;
  currentChapter: number;
  totalChapters: number;
  currentStage: string;
  humanInLoop: boolean;
  voiceEnabled: boolean;
  rlEnabled: boolean;
}

interface Metrics {
  rlStats: {
    totalRewards: number;
    averageReward: number;
    bestReward: number;
    worstReward: number;
    recentTrend: number;
  };
  contentStats: {
    totalBooks: number;
    totalChapters: number;
    totalVersions: number;
    averageRewardScore: number;
  };
  processingStats: {
    currentWorkflow: WorkflowStatus | null;
    queuedFeedback: number;
  };
}

export default function BookWorkflowDashboard() {
  const [sourceUrl, setSourceUrl] = useState('https://en.wikisource.org/wiki/The_Gates_of_Morning/Book_1/Chapter_1');
  const [chapterCount, setChapterCount] = useState(1);
  const [humanInLoop, setHumanInLoop] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [rlEnabled, setRlEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentBookId, setCurrentBookId] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Fetch workflow status and metrics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusResponse, metricsResponse] = await Promise.all([
          fetch('/api/workflow'),
          fetch('/api/metrics')
        ]);

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setWorkflowStatus(statusData.status);
        }

        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          setMetrics(metricsData.metrics);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const startWorkflow = async () => {
    setIsProcessing(true);
    setLogs([]);
    
    try {
      const response = await fetch('/api/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceUrl,
          options: {
            chapterCount,
            humanInLoop,
            voiceEnabled,
            rlEnabled
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentBookId(data.bookId);
        addLog(`Workflow started successfully. Book ID: ${data.bookId}`);
      } else {
        const error = await response.json();
        addLog(`Error starting workflow: ${error.error}`);
      }
    } catch (error) {
      addLog(`Error starting workflow: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const pauseWorkflow = async () => {
    try {
      const response = await fetch('/api/workflow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'pause'
        }),
      });

      if (response.ok) {
        addLog('Workflow paused');
      }
    } catch (error) {
      addLog(`Error pausing workflow: ${error}`);
    }
  };

  const resumeWorkflow = async () => {
    try {
      const response = await fetch('/api/workflow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'resume'
        }),
      });

      if (response.ok) {
        addLog('Workflow resumed');
      }
    } catch (error) {
      addLog(`Error resuming workflow: ${error}`);
    }
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;

    try {
      const response = await fetch('/api/workflow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'feedback',
          data: {
            id: currentBookId,
            userId: 'user_1',
            type: 'reviewer',
            feedback: feedback,
            rating: 7,
            suggestions: [],
            timestamp: new Date()
          }
        }),
      });

      if (response.ok) {
        addLog('Feedback submitted successfully');
        setFeedback('');
      }
    } catch (error) {
      addLog(`Error submitting feedback: ${error}`);
    }
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        addLog(`Search completed: ${data.results.chapters?.length || 0} chapters found`);
      }
    } catch (error) {
      addLog(`Error performing search: ${error}`);
    }
  };

  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
    if (!isListening) {
      addLog('Voice recording started');
    } else {
      addLog('Voice recording stopped');
    }
  };

  const exportBook = async () => {
    if (!currentBookId) return;

    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: currentBookId,
          action: 'export'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addLog('Book exported successfully');
        // You could trigger a download here
      }
    } catch (error) {
      addLog(`Error exporting book: ${error}`);
    }
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scraped': return 'bg-blue-500';
      case 'ai_spinning': return 'bg-yellow-500';
      case 'ai_review': return 'bg-orange-500';
      case 'human_review': return 'bg-purple-500';
      case 'approved': return 'bg-green-500';
      case 'published': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressPercentage = () => {
    if (!workflowStatus) return 0;
    return (workflowStatus.currentChapter / workflowStatus.totalChapters) * 100;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Publication Workflow</h1>
          <p className="text-muted-foreground">AI-powered content processing with human-in-the-loop</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={toggleVoiceRecording} variant={isListening ? "destructive" : "outline"}>
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? 'Stop' : 'Voice'}
          </Button>
          <Button onClick={exportBook} disabled={!currentBookId}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="workflow" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Workflow Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Source URL</Label>
                  <Input
                    id="sourceUrl"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://en.wikisource.org/wiki/..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chapterCount">Chapter Count</Label>
                  <Input
                    id="chapterCount"
                    type="number"
                    value={chapterCount}
                    onChange={(e) => setChapterCount(parseInt(e.target.value))}
                    min="1"
                    max="50"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="humanInLoop"
                      checked={humanInLoop}
                      onCheckedChange={setHumanInLoop}
                    />
                    <Label htmlFor="humanInLoop">Human-in-the-Loop</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="voiceEnabled"
                      checked={voiceEnabled}
                      onCheckedChange={setVoiceEnabled}
                    />
                    <Label htmlFor="voiceEnabled">Voice Commands</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="rlEnabled"
                      checked={rlEnabled}
                      onCheckedChange={setRlEnabled}
                    />
                    <Label htmlFor="rlEnabled">RL Optimization</Label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    onClick={startWorkflow} 
                    disabled={isProcessing || !sourceUrl}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Start Workflow'}
                  </Button>
                  <Button onClick={pauseWorkflow} variant="outline">
                    <Pause className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Current Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {workflowStatus ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {workflowStatus.currentChapter} / {workflowStatus.totalChapters} chapters
                      </span>
                    </div>
                    <Progress value={getProgressPercentage()} className="w-full" />
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(workflowStatus.currentStage)}>
                        {workflowStatus.currentStage.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {workflowStatus.humanInLoop && (
                        <Badge variant="outline">
                          <Users className="h-3 w-3 mr-1" />
                          Human Review
                        </Badge>
                      )}
                      {workflowStatus.voiceEnabled && (
                        <Badge variant="outline">
                          <Mic className="h-3 w-3 mr-1" />
                          Voice
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Book ID: {workflowStatus.bookId}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No active workflow</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {humanInLoop && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Human Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Provide your feedback</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback for the current chapter..."
                    rows={3}
                  />
                </div>
                <Button onClick={submitFeedback} disabled={!feedback.trim()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Semantic Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for content..."
                  className="flex-1"
                />
                <Button onClick={performSearch} disabled={!searchQuery.trim()}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              {searchResults && (
                <div className="space-y-2">
                  <h4 className="font-medium">Search Results</h4>
                  <div className="space-y-2">
                    {searchResults.chapters?.map((chapter: any, index: number) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{chapter.metadata?.title || 'Untitled'}</h5>
                            <p className="text-sm text-muted-foreground">
                              Relevance: {((1 - chapter.distance) * 100).toFixed(1)}%
                            </p>
                          </div>
                          <Badge variant="outline">
                            {chapter.metadata?.status || 'Unknown'}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  RL Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metrics?.rlStats ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Average Reward</span>
                      <span className="font-medium">{metrics.rlStats.averageReward.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Best Reward</span>
                      <span className="font-medium">{metrics.rlStats.bestReward.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Recent Trend</span>
                      <span className={`font-medium ${metrics.rlStats.recentTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metrics.rlStats.recentTrend >= 0 ? '+' : ''}{metrics.rlStats.recentTrend.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No RL data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Content Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metrics?.contentStats ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Books</span>
                      <span className="font-medium">{metrics.contentStats.totalBooks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Chapters</span>
                      <span className="font-medium">{metrics.contentStats.totalChapters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Quality</span>
                      <span className="font-medium">{metrics.contentStats.averageRewardScore.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No content stats available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Processing Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metrics?.processingStats ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Workflows</span>
                      <span className="font-medium">
                        {metrics.processingStats.currentWorkflow ? 1 : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Queued Feedback</span>
                      <span className="font-medium">{metrics.processingStats.queuedFeedback}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${metrics.processingStats.currentWorkflow ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm">
                        {metrics.processingStats.currentWorkflow ? 'Active' : 'Idle'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No processing stats available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-y-auto bg-gray-50 rounded-md p-3">
                {logs.length > 0 ? (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div key={index} className="text-sm font-mono">
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No logs available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}