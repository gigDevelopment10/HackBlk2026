import { AdvisoryServer } from './servers/advisory-server.js';
import { MarketingServer } from './servers/marketing-server.js';
import { TechnologyServer } from './servers/technology-server.js';
import { EngineeringServer } from './servers/engineering-server.js';
import { OrchestratorService } from './orchestrator/orchestrator.js';
import type { ServiceConfig } from './types.js';

const SERVICE_CONFIGS: ServiceConfig[] = [
  { id: 'advisory-service-01', domain: 'advisory', port: 5001, host: 'localhost' },
  { id: 'marketing-service-01', domain: 'marketing', port: 5002, host: 'localhost' },
  { id: 'technology-service-01', domain: 'technology', port: 5003, host: 'localhost' },
  { id: 'engineering-service-01', domain: 'engineering', port: 5004, host: 'localhost' },
];

const ORCHESTRATOR_CONFIG = { port: 5000, host: 'localhost' };

class ServiceLineManager {
  private servers: any[] = [];
  private orchestrator: OrchestratorService;

  constructor() {
    this.orchestrator = new OrchestratorService();
  }

  async startAll(): Promise<void> {
    console.log('🚀 Starting Service Line Architecture...\n');

    // Start individual service servers
    const advisoryServer = new AdvisoryServer();
    const marketingServer = new MarketingServer();
    const technologyServer = new TechnologyServer();
    const engineeringServer = new EngineeringServer();

    this.servers = [
      { server: advisoryServer, config: SERVICE_CONFIGS[0] },
      { server: marketingServer, config: SERVICE_CONFIGS[1] },
      { server: technologyServer, config: SERVICE_CONFIGS[2] },
      { server: engineeringServer, config: SERVICE_CONFIGS[3] },
    ];

    // Start each service
    for (const { server, config } of this.servers) {
      console.log(`Starting ${config.domain} service on port ${config.port}...`);
      server.start(config.port);
      
      // Register with orchestrator
      this.orchestrator.registerService(config);
      
      // Wait a moment for service to start
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Start orchestrator
    console.log(`Starting orchestrator on port ${ORCHESTRATOR_CONFIG.port}...`);
    this.orchestrator.start(ORCHESTRATOR_CONFIG.port);

    console.log('\n✅ All services started successfully!');
    console.log('\n📊 Service Status:');
    console.log('┌─────────────────┬─────────────┬───────────┐');
    console.log('│ Service         │ Domain      │ Port     │');
    console.log('├─────────────────┼─────────────┼───────────┤');
    
    for (const config of SERVICE_CONFIGS) {
      console.log(`│ ${config.id.padEnd(15)} │ ${config.domain.padEnd(11)} │ ${config.port.toString().padEnd(9)} │`);
    }
    
    console.log('├─────────────────┼─────────────┼───────────┤');
    console.log(`│ ${'orchestrator-01'.padEnd(15)} │ ${'orchestration'.padEnd(11)} │ ${ORCHESTRATOR_CONFIG.port.toString().padEnd(9)} │`);
    console.log('└─────────────────┴─────────────┴───────────┘');
    
    console.log('\n🎯 Ready for distributed computing!');
  }

  async stopAll(): Promise<void> {
    console.log('\n🛑 Shutting down all services...');
    
    for (const { server, config } of this.servers) {
      console.log(`Stopping ${config.domain} service...`);
      server.stop();
    }
    
    this.orchestrator.stop();
    console.log('✅ All services stopped.');
  }
}

// Handle graceful shutdown
const manager = new ServiceLineManager();

process.on('SIGINT', async () => {
  console.log('\n\n🔄 Received SIGINT, shutting down gracefully...');
  await manager.stopAll();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🔄 Received SIGTERM, shutting down gracefully...');
  await manager.stopAll();
  process.exit(0);
});

// Start all services
if (import.meta.url === `file://${process.argv[1]}`) {
  manager.startAll().catch(console.error);
}

export { ServiceLineManager, SERVICE_CONFIGS };