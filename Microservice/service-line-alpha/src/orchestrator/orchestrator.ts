import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { CommonDataSource } from '../common/data-source.js';
import type { Domain, ServiceConfig } from '../types.js';

const PROTO_PATH = new URL('../../proto/service.proto', import.meta.url).pathname;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});

const serviceline = grpc.loadPackageDefinition(packageDefinition).serviceline as any;

interface ServiceRegistry {
  [key: string]: {
    client: any;
    config: ServiceConfig;
    status: 'healthy' | 'unhealthy' | 'unknown';
    lastCheck: number;
  };
}

export class OrchestratorService {
  private server: grpc.Server;
  private dataSource: CommonDataSource;
  private serviceRegistry: ServiceRegistry = {};
  private orchestratorId = 'orchestrator-01';

  constructor() {
    this.server = new grpc.Server();
    this.dataSource = new CommonDataSource();
    this.setupGrpcServices();
  }

  private setupGrpcServices(): void {
    this.server.addService(serviceline.Orchestrator.service, {
      distributeTask: this.distributeTask.bind(this),
      getServiceList: this.getServiceList.bind(this),
      monitorServices: this.monitorServices.bind(this),
    });
  }

  async distributeTask(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    try {
      const request = call.request;
      console.log(`[Orchestrator] Distributing task: ${request.operation} to domain: ${request.domain}`);

      const targetService = this.serviceRegistry[request.domain];
      
      if (!targetService) {
        throw new Error(`No service available for domain: ${request.domain}`);
      }

      if (targetService.status !== 'healthy') {
        throw new Error(`Service ${request.domain} is not healthy`);
      }

      // Execute task on target service
      const client = new serviceline.ServiceLine(
        `${targetService.config.host}:${targetService.config.port}`,
        grpc.credentials.createInsecure()
      );

      const result = await new Promise((resolve, reject) => {
        client.executeTask(request, (error: any, response: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });

      const response = {
        task_id: request.task_id,
        success: true,
        message: `Task distributed and executed on ${request.domain} service`,
        data: result,
        timestamp: Date.now(),
        execution_path: `orchestrator -> ${request.domain} service`
      };

      callback(null, response);
    } catch (error) {
      console.error('[Orchestrator] Task distribution error:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  async getServiceList(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    try {
      const services = Object.entries(this.serviceRegistry).map(([domain, service]) => ({
        domain,
        service_id: service.config.id,
        status: service.status,
        endpoint: `${service.config.host}:${service.config.port}`,
        last_check: new Date(service.lastCheck).toISOString()
      }));

      const response = {
        task_id: `svc_list_${Date.now()}`,
        success: true,
        message: 'Service list retrieved successfully',
        data: { services, total_services: services.length },
        timestamp: Date.now(),
      };

      callback(null, response);
    } catch (error) {
      console.error('[Orchestrator] Get service list error:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  async monitorServices(
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
  ): Promise<void> {
    try {
      console.log('[Orchestrator] Monitoring all services...');
      
      const monitoringResults = await Promise.allSettled(
        Object.entries(this.serviceRegistry).map(async ([domain, service]) => {
          try {
            const client = new serviceline.ServiceLine(
              `${service.config.host}:${service.config.port}`,
              grpc.credentials.createInsecure()
            );

            const healthResponse = await new Promise((resolve, reject) => {
              const healthRequest = {
                service_id: service.config.id,
                status: 'check',
                timestamp: Date.now()
              };
              
              client.healthCheck(healthRequest, (error: any, response: any) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(response);
                }
              });
            });

            if (this.serviceRegistry[domain]) {
              this.serviceRegistry[domain].status = 'healthy';
              this.serviceRegistry[domain].lastCheck = Date.now();
            }

            return {
              domain,
              status: 'healthy',
              response: healthResponse
            };
          } catch (error) {
            if (this.serviceRegistry[domain]) {
              this.serviceRegistry[domain].status = 'unhealthy';
              this.serviceRegistry[domain].lastCheck = Date.now();
            }

            return {
              domain,
              status: 'unhealthy',
              error: error instanceof Error ? error.message : 'Unknown error'
            };
          }
        })
      );

      const summary = {
        total_services: Object.keys(this.serviceRegistry).length,
        healthy: monitoringResults.filter(r => r.status === 'fulfilled').length,
        unhealthy: monitoringResults.filter(r => r.status === 'rejected').length,
        timestamp: Date.now()
      };

      const response = {
        task_id: `monitor_${Date.now()}`,
        success: true,
        message: 'Service monitoring completed',
        data: {
          summary,
          details: monitoringResults.map(r => r.status === 'fulfilled' ? r.value : r.reason)
        },
        timestamp: Date.now(),
      };

      callback(null, response);
    } catch (error) {
      console.error('[Orchestrator] Service monitoring error:', error);
      callback({
        code: grpc.status.INTERNAL,
        details: error instanceof Error ? error.message : 'Unknown error',
      }, null);
    }
  }

  registerService(config: ServiceConfig): void {
    console.log(`[Orchestrator] Registering service: ${config.id} (${config.domain})`);
    
    const client = new serviceline.ServiceLine(
      `${config.host}:${config.port}`,
      grpc.credentials.createInsecure()
    );

    this.serviceRegistry[config.domain] = {
      client,
      config,
      status: 'unknown',
      lastCheck: Date.now()
    };
  }

  start(port: number): void {
    this.server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error('[Orchestrator] Failed to start server:', err);
          return;
        }
        console.log(`[Orchestrator] Server running on port ${port}`);
        this.server.start();
        
        // Start periodic health monitoring
        setInterval(() => {
          this.monitorServices({} as any, () => {});
        }, 30000); // Every 30 seconds
      }
    );
  }

  stop(): void {
    console.log('[Orchestrator] Shutting down server...');
    this.server.forceShutdown();
  }
}
