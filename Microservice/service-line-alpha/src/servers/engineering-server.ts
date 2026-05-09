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

export class EngineeringServer {
  private server: grpc.Server;
  private dataSource: CommonDataSource;
  private serviceId = 'engineering-service-01';

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
      console.log(`[Engineering] Executing task: ${request.operation}`);

      const taskSchema = z.object({
        task_id: z.string(),
        domain: z.enum(['engineering']),
        operation: z.enum(['code_review', 'security_analysis', 'architecture_design', 'quality_assurance']),
        parameters: z.record(z.string(), z.string()),
        priority: z.coerce.number(),
        requester_id: z.string(),
      });

      const validatedTask = taskSchema.parse(request);

      let result: any = {};

      switch (validatedTask.operation) {
        case 'code_review':
          result = await this.performCodeReview(validatedTask.parameters as Record<string, string>);
          break;
        case 'security_analysis':
          result = await this.performSecurityAnalysis(validatedTask.parameters as Record<string, string>);
          break;
        case 'architecture_design':
          result = await this.performArchitectureDesign(validatedTask.parameters as Record<string, string>);
          break;
        case 'quality_assurance':
          result = await this.performQualityAssurance(validatedTask.parameters as Record<string, string>);
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
      console.error('[Engineering] Task execution error:', error instanceof Error ? error.message : String(error));
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  private async performCodeReview(params: Record<string, string>): Promise<any> {
    const repository = params.repository || 'main';
    const branch = params.branch || 'feature/new-api';
    
    return {
      repository: repository,
      branch: branch,
      review_status: 'completed',
      files_reviewed: Math.floor(Math.random() * 20) + 5,
      issues_found: {
        critical: Math.floor(Math.random() * 3),
        major: Math.floor(Math.random() * 5) + 2,
        minor: Math.floor(Math.random() * 10) + 5,
        suggestions: Math.floor(Math.random() * 8) + 3
      },
      code_quality_score: Math.floor(Math.random() * 20) + 75,
      security_issues: Math.floor(Math.random() * 2),
      performance_issues: Math.floor(Math.random() * 4),
      recommendations: [
        'Add input validation',
        'Improve error handling',
        'Optimize database queries',
        'Add unit tests'
      ],
      approval_status: 'approved_with_changes'
    };
  }

  private async performSecurityAnalysis(params: Record<string, string>): Promise<any> {
    const target = params.target || 'api-gateway';
    
    return {
      analysis_target: target,
      security_score: Math.floor(Math.random() * 15) + 85,
      vulnerabilities_found: {
        critical: Math.floor(Math.random() * 2),
        high: Math.floor(Math.random() * 3),
        medium: Math.floor(Math.random() * 5) + 2,
        low: Math.floor(Math.random() * 8) + 5
      },
      security_controls_assessed: [
        'Authentication',
        'Authorization',
        'Data encryption',
        'Input validation',
        'Logging and monitoring'
      ],
      compliance_status: {
        gdpr: 'compliant',
        soc2: 'compliant',
        pci_dss: 'partial'
      },
      recommendations: [
        'Implement multi-factor authentication',
        'Add API rate limiting',
        'Enhance logging capabilities',
        'Regular security training'
      ],
      next_scan_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  private async performArchitectureDesign(params: Record<string, string>): Promise<any> {
    const systemType = params.system_type || 'microservices';
    
    return {
      system_type: systemType,
      design_status: 'draft_completed',
      architecture_pattern: systemType === 'microservices' ? 'microservices' : 'monolithic',
      components: [
        'API Gateway',
        'Authentication Service',
        'Business Logic Services',
        'Data Layer',
        'Cache Layer'
      ],
      technology_stack: {
        backend: 'Node.js/TypeScript',
        database: 'PostgreSQL/MongoDB',
        cache: 'Redis',
        message_queue: 'RabbitMQ',
        containerization: 'Docker/Kubernetes'
      },
      scalability_metrics: {
        horizontal_scaling: 'supported',
        vertical_scaling: 'supported',
        load_balancing: 'implemented',
        auto_scaling: 'planned'
      },
      non_functional_requirements: {
        availability: '99.9%',
        performance: '<200ms response time',
        security: 'OAuth2 + JWT',
        maintainability: 'modular design'
      }
    };
  }

  private async performQualityAssurance(params: Record<string, string>): Promise<any> {
    const testType = params.test_type || 'comprehensive';
    
    return {
      test_type: testType,
      qa_status: 'in_progress',
      test_coverage: `${(Math.random() * 20 + 75).toFixed(1)}%`,
      test_results: {
        total_tests: Math.floor(Math.random() * 500) + 200,
        passed: Math.floor(Math.random() * 450) + 180,
        failed: Math.floor(Math.random() * 20) + 5,
        skipped: Math.floor(Math.random() * 30) + 10
      },
      test_categories: [
        'Unit Tests',
        'Integration Tests',
        'End-to-End Tests',
        'Performance Tests',
        'Security Tests'
      ],
      quality_metrics: {
        code_coverage: `${(Math.random() * 15 + 80).toFixed(1)}%`,
        defect_density: `${(Math.random() * 2 + 0.5).toFixed(2)}`,
        mean_time_to_resolution: `${(Math.random() * 4 + 1).toFixed(1)}h`,
        customer_satisfaction: `${(Math.random() * 0.2 + 0.8).toFixed(2)}`
      },
      recommendations: [
        'Increase test coverage',
        'Add more integration tests',
        'Implement automated testing pipeline',
        'Improve test documentation'
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
      message: 'Engineering service registered successfully',
      data: {
        service_id: this.serviceId,
        domain: 'engineering',
        capabilities: CAPABILITIES.engineering
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
          console.error('[Engineering] Failed to start server:', err);
          return;
        }
        console.log(`[Engineering] Server running on port ${port}`);
        this.server.start();
      }
    );
  }

  stop(): void {
    console.log('[Engineering] Shutting down server...');
    this.server.forceShutdown();
  }
}
