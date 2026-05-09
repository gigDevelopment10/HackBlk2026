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

export class AdvisoryServer {
  private server: grpc.Server;
  private dataSource: CommonDataSource;
  private serviceId = 'advisory-service-01';

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
      console.log(`[Advisory] Executing task: ${request.operation}`);

      const taskSchema = z.object({
        task_id: z.string(),
        domain: z.enum(['advisory']),
        operation: z.enum(['market_research', 'strategic_analysis', 'competitive_intelligence', 'risk_assessment']),
        parameters: z.record(z.string(), z.string()),
        priority: z.coerce.number(),
        requester_id: z.string(),
      });

      const validatedTask = taskSchema.parse(request);

      let result: any = {};

      switch (validatedTask.operation) {
        case 'market_research':
          result = await this.performMarketResearch(validatedTask.parameters as Record<string, string>);
          break;
        case 'strategic_analysis':
          result = await this.performStrategicAnalysis(validatedTask.parameters as Record<string, string>);
          break;
        case 'competitive_intelligence':
          result = await this.performCompetitiveIntelligence(validatedTask.parameters as Record<string, string>);
          break;
        case 'risk_assessment':
          result = await this.performRiskAssessment(validatedTask.parameters as Record<string, string>);
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
      console.error('[Advisory] Task execution error:', error instanceof Error ? error.message : String(error));
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  private async performMarketResearch(params: Record<string, string>): Promise<any> {
    const marketData = await this.dataSource.getData('advisory:market_trends');
    const segment = params.segment || 'general';

    return {
      segment,
      trends: marketData?.data?.trends || [],
      insights: marketData?.data?.insights || '',
      recommendations: [
        'Invest in AI technologies',
        'Focus on sustainability initiatives',
        'Enhance cloud infrastructure'
      ],
      confidence_score: 0.87,
      data_sources: ['market_reports', 'industry_analysis', 'consumer_surveys']
    };
  }

  private async performStrategicAnalysis(params: Record<string, string>): Promise<any> {
    const businessUnit = params.business_unit || 'all';
    
    return {
      business_unit: businessUnit,
      swot_analysis: {
        strengths: ['Strong market position', 'Innovation capabilities'],
        weaknesses: ['Limited resources', 'Operational inefficiencies'],
        opportunities: ['Market expansion', 'Technology adoption'],
        threats: ['Competition', 'Regulatory changes']
      },
      strategic_priorities: [
        'Digital transformation',
        'Market diversification',
        'Operational excellence'
      ],
      timeline: '12-18 months',
      investment_required: '$2.5M'
    };
  }

  private async performCompetitiveIntelligence(params: Record<string, string>): Promise<any> {
    const competitor = params.competitor || 'industry_average';
    
    return {
      competitor,
      market_share: {
        us: '23%',
        competitor: '31%',
        others: '46%'
      },
      competitive_positioning: {
        price: 'premium',
        quality: 'high',
        innovation: 'leading',
        service: 'excellent'
      },
      threats: ['Price wars', 'Talent acquisition', 'Technology disruption'],
      opportunities: ['Market gaps', 'Competitor weaknesses', 'Partnerships']
    };
  }

  private async performRiskAssessment(params: Record<string, string>): Promise<any> {
    const project = params.project || 'general';
    
    return {
      project,
      risk_matrix: {
        high: ['Data security', 'Regulatory compliance'],
        medium: ['Market volatility', 'Technology adoption'],
        low: ['Operational efficiency', 'Brand reputation']
      },
      overall_risk_score: 6.8,
      mitigation_strategies: [
        'Implement robust security measures',
        'Establish compliance framework',
        'Create contingency plans'
      ],
      monitoring_frequency: 'weekly'
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
      message: 'Advisory service registered successfully',
      data: {
        service_id: this.serviceId,
        domain: 'advisory',
        capabilities: CAPABILITIES.advisory
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
          console.error('[Advisory] Failed to start server:', err);
          return;
        }
        console.log(`[Advisory] Server running on port ${port}`);
        this.server.start();
      }
    );
  }

  stop(): void {
    console.log('[Advisory] Shutting down server...');
    this.server.forceShutdown();
  }
}
