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

export class TechnologyServer {
  private server: grpc.Server;
  private dataSource: CommonDataSource;
  private serviceId = 'technology-service-01';

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
      console.log(`[Technology] Executing task: ${request.operation}`);

      const taskSchema = z.object({
        task_id: z.string(),
        domain: z.enum(['technology']),
        operation: z.enum(['data_processing', 'system_integration', 'api_development', 'performance_optimization']),
        parameters: z.record(z.string(), z.string()),
        priority: z.coerce.number(),
        requester_id: z.string(),
      });

      const validatedTask = taskSchema.parse(request);

      let result: any = {};

      switch (validatedTask.operation) {
        case 'data_processing':
          result = await this.performDataProcessing(validatedTask.parameters as Record<string, string>);
          break;
        case 'system_integration':
          result = await this.performSystemIntegration(validatedTask.parameters as Record<string, string>);
          break;
        case 'api_development':
          result = await this.performApiDevelopment(validatedTask.parameters as Record<string, string>);
          break;
        case 'performance_optimization':
          result = await this.performPerformanceOptimization(validatedTask.parameters as Record<string, string>);
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
      console.error('[Technology] Task execution error:', error instanceof Error ? error.message : String(error));
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  private async performDataProcessing(params: Record<string, string>): Promise<any> {
    const dataType = params.data_type || 'analytics';
    const volume = params.volume || 'medium';
    
    return {
      data_type: dataType,
      volume: volume,
      processing_status: 'completed',
      records_processed: Math.floor(Math.random() * 100000) + 10000,
      processing_time: `${(Math.random() * 10 + 2).toFixed(2)}s`,
      quality_score: Math.floor(Math.random() * 20) + 80,
      output_format: 'json',
      compression_ratio: '0.65',
      errors_detected: Math.floor(Math.random() * 5),
      recommendations: [
        'Implement data validation checkpoints',
        'Optimize query performance',
        'Add real-time processing capabilities'
      ]
    };
  }

  private async performSystemIntegration(params: Record<string, string>): Promise<any> {
    const systemA = params.system_a || 'crm';
    const systemB = params.system_b || 'erp';
    
    return {
      systems_integrated: [systemA, systemB],
      integration_type: 'api_based',
      status: 'operational',
      data_flow: 'bidirectional',
      sync_frequency: 'real_time',
      endpoints_connected: 12,
      throughput: '1000 req/s',
      latency: `${(Math.random() * 50 + 10).toFixed(0)}ms`,
      uptime: '99.9%',
      monitoring: {
        alerts: 2,
        health_checks: 'passing',
        last_sync: new Date().toISOString()
      }
    };
  }

  private async performApiDevelopment(params: Record<string, string>): Promise<any> {
    const apiType = params.api_type || 'rest';
    const complexity = params.complexity || 'medium';
    
    return {
      api_type: apiType,
      complexity: complexity,
      development_status: 'in_progress',
      endpoints_designed: 15,
      endpoints_implemented: 12,
      documentation_coverage: '85%',
      testing_coverage: '78%',
      security_features: [
        'OAuth2 authentication',
        'Rate limiting',
        'Input validation',
        'HTTPS encryption'
      ],
      performance_benchmarks: {
        avg_response_time: `${(Math.random() * 200 + 50).toFixed(0)}ms`,
        throughput: '500 req/s',
        error_rate: '0.1%'
      }
    };
  }

  private async performPerformanceOptimization(params: Record<string, string>): Promise<any> {
    const target = params.target || 'database';
    
    return {
      optimization_target: target,
      baseline_metrics: {
        response_time: `${(Math.random() * 500 + 200).toFixed(0)}ms`,
        throughput: '200 req/s',
        cpu_usage: '85%',
        memory_usage: '78%'
      },
      optimized_metrics: {
        response_time: `${(Math.random() * 100 + 50).toFixed(0)}ms`,
        throughput: '800 req/s',
        cpu_usage: '45%',
        memory_usage: '52%'
      },
      improvements_applied: [
        'Query optimization',
        'Caching implementation',
        'Connection pooling',
        'Index optimization'
      ],
      performance_gain: `${(Math.random() * 50 + 30).toFixed(1)}%`,
      recommendations: [
        'Implement distributed caching',
        'Consider database sharding',
        'Optimize application code'
      ]
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
      message: 'Technology service registered successfully',
      data: {
        service_id: this.serviceId,
        domain: 'technology',
        capabilities: CAPABILITIES.technology
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
          console.error('[Technology] Failed to start server:', err);
          return;
        }
        console.log(`[Technology] Server running on port ${port}`);
        this.server.start();
      }
    );
  }

  stop(): void {
    console.log('[Technology] Shutting down server...');
    this.server.forceShutdown();
  }
}
