import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { CommonDataSource } from '../common/data-source.js';
import { CAPABILITIES } from '../types.js';
import { z } from 'zod';

const PROTO_PATH = new URL('../../proto/service.proto', import.meta.url).pathname;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});

const serviceline = grpc.loadPackageDefinition(packageDefinition).serviceline as any;

export class MarketingServer {
  private server: grpc.Server;
  private dataSource: CommonDataSource;
  private serviceId = 'marketing-service-01';

  constructor() {
    this.server = new grpc.Server();
    this.dataSource = new CommonDataSource();
    this.setupGrpcServices();
  }

  private setupGrpcServices(): void {
    this.server.addService(serviceline.ServiceLine.service, {
      executeTask: this.executeTask.bind(this),
      healthCheck: this.healthCheck.bind(this),
      registerService: this.registerService.bind(this),
    });
  }

  async executeTask(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    try {
      const request = call.request;
      console.log(`[Marketing] Executing task: ${request.operation}`);

      const taskSchema = z.object({
        task_id: z.string(),
        domain: z.enum(['marketing']),
        operation: z.enum(['content_creation', 'campaign_management', 'seo_optimization', 'social_media_strategy']),
        parameters: z.record(z.string(), z.string()),
        priority: z.coerce.number(),
        requester_id: z.string(),
      });

      const validatedTask = taskSchema.parse(request);

      let result: any = {};

      switch (validatedTask.operation) {
        case 'content_creation':
          result = await this.performContentCreation(validatedTask.parameters as Record<string, string>);
          break;
        case 'campaign_management':
          result = await this.performCampaignManagement(validatedTask.parameters as Record<string, string>);
          break;
        case 'seo_optimization':
          result = await this.performSeoOptimization(validatedTask.parameters as Record<string, string>);
          break;
        case 'social_media_strategy':
          result = await this.performSocialMediaStrategy(validatedTask.parameters as Record<string, string>);
          break;
        default:
          throw new Error(`Unsupported operation: ${validatedTask.operation}`);
      }

      const response = {
        task_id: validatedTask.task_id,
        success: true,
        message: 'Task completed successfully',
        data: result,
        timestamp: Date.now(),
      };

      callback(null, response);
    } catch (error: unknown) {
      console.error('[Marketing] Task execution error:', error instanceof Error ? error.message : String(error));
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  private async performContentCreation(params: Record<string, string>): Promise<any> {
    const contentType = params.content_type || 'blog';
    const topic = params.topic || 'technology trends';
    
    return {
      content_type: contentType,
      topic: topic,
      generated_content: `Comprehensive ${contentType} about ${topic} with market insights and strategic recommendations.`,
      word_count: Math.floor(Math.random() * 1000) + 500,
      seo_score: 85,
      engagement_prediction: 'high',
      distribution_channels: ['website', 'linkedin', 'twitter', 'newsletter']
    };
  }

  private async performCampaignManagement(params: Record<string, string>): Promise<any> {
    const campaignName = params.campaign_name || 'Q2 Launch';
    const budget = params.budget || '50000';
    
    return {
      campaign_name: campaignName,
      budget: budget,
      status: 'active',
      performance_metrics: {
        reach: Math.floor(Math.random() * 100000) + 50000,
        engagement_rate: (Math.random() * 0.1 + 0.02).toFixed(3),
        conversion_rate: (Math.random() * 0.05 + 0.01).toFixed(3),
        roi: ((Math.random() * 2 + 1) * 100).toFixed(1) + '%'
      },
      target_audience: ['tech_enthusiasts', 'business_leaders', 'decision_makers'],
      channels: ['email', 'social', 'content', 'ppc']
    };
  }

  private async performSeoOptimization(params: Record<string, string>): Promise<any> {
    const pageUrl = params.page_url || '/homepage';
    
    return {
      page_url: pageUrl,
      current_score: Math.floor(Math.random() * 30) + 60,
      recommendations: [
        'Optimize meta descriptions',
        'Improve page load speed',
        'Add internal linking',
        'Enhance mobile responsiveness'
      ],
      keyword_opportunities: [
        'distributed computing',
        'microservices architecture',
        'cloud solutions'
      ],
      competitor_analysis: {
        our_ranking: 12,
        top_competitor_ranking: 3,
        opportunity_score: 78
      }
    };
  }

  private async performSocialMediaStrategy(params: Record<string, string>): Promise<any> {
    const platform = params.platform || 'linkedin';
    
    return {
      platform: platform,
      strategy_type: 'engagement_focused',
      content_pillars: [
        'Industry insights',
        'Company culture',
        'Product updates',
        'Thought leadership'
      ],
      posting_frequency: '3x per week',
      engagement_targets: {
        likes: '1000+',
        comments: '100+',
        shares: '50+',
        reach: '10000+'
      },
      best_posting_times: ['9-11 AM', '2-4 PM'],
      content_mix: {
        educational: 40,
        promotional: 20,
        interactive: 25,
        behind_scenes: 15
      }
    };
  }

  async healthCheck(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    const health = this.dataSource.getHealth();
    const response = {
      service_id: this.serviceId,
      status: 'healthy',
      timestamp: Date.now(),
      details: health
    };
    callback(null, response);
  }

  async registerService(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    const response = {
      task_id: `reg_${Date.now()}`,
      success: true,
      message: 'Marketing service registered successfully',
      data: {
        service_id: this.serviceId,
        domain: 'marketing',
        capabilities: CAPABILITIES.marketing
      },
      timestamp: Date.now(),
    };
    callback(null, response);
  }

  start(port: number): void {
    this.server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error('[Marketing] Failed to start server:', err);
          return;
        }
        console.log(`[Marketing] Server running on port ${port}`);
        this.server.start();
      }
    );
  }

  stop(): void {
    console.log('[Marketing] Shutting down server...');
    this.server.forceShutdown();
  }
}
