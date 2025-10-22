import { Matrix } from 'ml-matrix';
import { v4 as uuidv4 } from 'uuid';
import { RLReward } from './types';

export interface QTableEntry {
  state: string;
  action: string;
  qValue: number;
  visits: number;
}

export class RLRewardSystem {
  private qTable: Map<string, QTableEntry> = new Map();
  private learningRate: number = 0.1;
  private discountFactor: number = 0.95;
  private epsilon: number = 0.1; // Exploration factor
  private rewardHistory: RLReward[] = [];

  constructor(
    learningRate: number = 0.1,
    discountFactor: number = 0.95,
    epsilon: number = 0.1
  ) {
    this.learningRate = learningRate;
    this.discountFactor = discountFactor;
    this.epsilon = epsilon;
  }

  async storeReward(reward: RLReward): Promise<void> {
    this.rewardHistory.push(reward);
    await this.updateQTable(reward);
  }

  private async updateQTable(reward: RLReward): Promise<void> {
    const stateKey = this.serializeState(reward.state);
    const actionKey = reward.action;
    const qKey = `${stateKey}:${actionKey}`;

    const currentEntry = this.qTable.get(qKey) || {
      state: stateKey,
      action: actionKey,
      qValue: 0,
      visits: 0
    };

    // Q-Learning update rule: Q(s,a) = Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]
    const nextStateKey = this.serializeState(reward.nextState);
    const maxNextQValue = this.getMaxQValue(nextStateKey);
    
    const newQValue = currentEntry.qValue + this.learningRate * 
      (reward.reward + this.discountFactor * maxNextQValue - currentEntry.qValue);

    this.qTable.set(qKey, {
      ...currentEntry,
      qValue: newQValue,
      visits: currentEntry.visits + 1
    });
  }

  private serializeState(state: Record<string, any>): string {
    return JSON.stringify(state, Object.keys(state).sort());
  }

  private getMaxQValue(stateKey: string): number {
    let maxQ = 0;
    for (const [key, entry] of this.qTable) {
      if (key.startsWith(stateKey + ':')) {
        maxQ = Math.max(maxQ, entry.qValue);
      }
    }
    return maxQ;
  }

  selectAction(state: Record<string, any>, availableActions: string[]): string {
    const stateKey = this.serializeState(state);
    
    // Epsilon-greedy action selection
    if (Math.random() < this.epsilon) {
      // Explore: random action
      return availableActions[Math.floor(Math.random() * availableActions.length)];
    } else {
      // Exploit: best action based on Q-values
      let bestAction = availableActions[0];
      let bestQValue = -Infinity;
      
      for (const action of availableActions) {
        const qKey = `${stateKey}:${action}`;
        const entry = this.qTable.get(qKey);
        const qValue = entry?.qValue || 0;
        
        if (qValue > bestQValue) {
          bestQValue = qValue;
          bestAction = action;
        }
      }
      
      return bestAction;
    }
  }

  calculateReward(
    contentQuality: number,
    humanFeedback: number,
    processingTime: number,
    errorRate: number
  ): number {
    let reward = 0;
    
    // Content quality reward (0-100)
    reward += contentQuality * 0.4;
    
    // Human feedback reward (0-10)
    reward += humanFeedback * 10 * 0.3;
    
    // Processing efficiency reward (inverse of time)
    reward += Math.max(0, (100 - processingTime) * 0.2);
    
    // Error penalty
    reward -= errorRate * 50 * 0.1;
    
    return Math.max(0, reward);
  }

  getRewardStats(): {
    totalRewards: number;
    averageReward: number;
    bestReward: number;
    worstReward: number;
    recentTrend: number;
  } {
    if (this.rewardHistory.length === 0) {
      return {
        totalRewards: 0,
        averageReward: 0,
        bestReward: 0,
        worstReward: 0,
        recentTrend: 0
      };
    }

    const rewards = this.rewardHistory.map(r => r.reward);
    const totalRewards = rewards.reduce((sum, r) => sum + r, 0);
    const averageReward = totalRewards / rewards.length;
    const bestReward = Math.max(...rewards);
    const worstReward = Math.min(...rewards);
    
    // Calculate recent trend (last 10 vs previous 10)
    let recentTrend = 0;
    if (rewards.length >= 20) {
      const recent = rewards.slice(-10).reduce((sum, r) => sum + r, 0) / 10;
      const previous = rewards.slice(-20, -10).reduce((sum, r) => sum + r, 0) / 10;
      recentTrend = ((recent - previous) / previous) * 100;
    }

    return {
      totalRewards,
      averageReward,
      bestReward,
      worstReward,
      recentTrend
    };
  }

  optimizeParameters(performance: number): void {
    // Adaptive parameter tuning based on performance
    if (performance < 0.3) {
      // Poor performance: increase exploration
      this.epsilon = Math.min(0.5, this.epsilon + 0.05);
      this.learningRate = Math.min(0.3, this.learningRate + 0.01);
    } else if (performance > 0.8) {
      // Good performance: decrease exploration
      this.epsilon = Math.max(0.01, this.epsilon - 0.02);
      this.learningRate = Math.max(0.05, this.learningRate - 0.005);
    }
  }

  exportQTable(): Record<string, QTableEntry> {
    const exported: Record<string, QTableEntry> = {};
    for (const [key, entry] of this.qTable) {
      exported[key] = entry;
    }
    return exported;
  }

  importQTable(qTable: Record<string, QTableEntry>): void {
    this.qTable.clear();
    for (const [key, entry] of Object.entries(qTable)) {
      this.qTable.set(key, entry);
    }
  }

  predictOptimalAction(state: Record<string, any>): {
    action: string;
    confidence: number;
    expectedReward: number;
  } {
    const stateKey = this.serializeState(state);
    let bestAction = '';
    let bestQValue = -Infinity;
    let totalVisits = 0;

    for (const [key, entry] of this.qTable) {
      if (key.startsWith(stateKey + ':')) {
        totalVisits += entry.visits;
        if (entry.qValue > bestQValue) {
          bestQValue = entry.qValue;
          bestAction = entry.action;
        }
      }
    }

    const bestEntry = this.qTable.get(`${stateKey}:${bestAction}`);
    const confidence = bestEntry ? bestEntry.visits / Math.max(1, totalVisits) : 0;

    return {
      action: bestAction,
      confidence,
      expectedReward: bestQValue
    };
  }
}

export default RLRewardSystem;