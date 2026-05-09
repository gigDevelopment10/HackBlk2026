export class CommonDataSource {
  private dataStore: Map<string, any> = new Map();
  private subscribers: Map<string, Set<string>> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Sample data for each domain
    this.dataStore.set('advisory:market_trends', {
      lastUpdated: Date.now(),
      data: {
        trends: ['AI adoption', 'Cloud migration', 'Sustainability focus'],
        insights: 'Market shifting towards AI-driven solutions'
      }
    });

    this.dataStore.set('marketing:campaigns', {
      lastUpdated: Date.now(),
      data: {
        active_campaigns: ['Q2_Launch', 'Summer_Promo'],
        performance: { ctr: 0.024, conversion: 0.018 }
      }
    });

    this.dataStore.set('technology:systems', {
      lastUpdated: Date.now(),
      data: {
        services: ['api-gateway', 'data-processor', 'auth-service'],
        health: { cpu: 65, memory: 72, disk: 45 }
      }
    });

    this.dataStore.set('engineering:projects', {
      lastUpdated: Date.now(),
      data: {
        active_reviews: 12,
        security_score: 94,
        coverage: 87
      }
    });
  }

  async getData(key: string): Promise<any> {
    const data = this.dataStore.get(key);
    return data || null;
  }

  async storeData(key: string, value: any): Promise<boolean> {
    try {
      this.dataStore.set(key, {
        ...value,
        lastUpdated: Date.now()
      });
      
      this.notifySubscribers(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  async syncData(): Promise<Map<string, any>> {
    return new Map(this.dataStore);
  }

  subscribe(key: string, subscriberId: string): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(subscriberId);
  }

  private notifySubscribers(key: string): void {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(subscriberId => {
        console.log(`Notification: ${key} updated for ${subscriberId}`);
      });
    }
  }

  getHealth(): { status: string; entries: number; subscribers: number } {
    return {
      status: 'healthy',
      entries: this.dataStore.size,
      subscribers: Array.from(this.subscribers.values()).reduce((sum, set) => sum + set.size, 0)
    };
  }
}
