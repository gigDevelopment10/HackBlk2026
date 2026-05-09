import { AdvisoryServer } from './servers/advisory-server.js';
import { MarketingServer } from './servers/marketing-server.js';
import { TechnologyServer } from './servers/technology-server.js';
import { EngineeringServer } from './servers/engineering-server.js';
import { OrchestratorService } from './orchestrator/orchestrator.js';
import type { ServiceConfig } from './types.js';

// Use different ports to avoid conflicts
const SERVICE_CONFIGS: ServiceConfig[] = [
  { id: 'advisory-service-01', domain: 'advisory', port: 6001, host: 'localhost' },
  { id: 'marketing-service-01', domain: 'marketing', port: 6002, host: 'localhost' },
  { id: 'technology-service-01', domain: 'technology', port: 6003, host: 'localhost' },
  { id: 'engineering-service-01', domain: 'engineering', port: 6004, host: 'localhost' },
];

const ORCHESTRATOR_CONFIG = { port: 6000, host: 'localhost' };

class QuickTestManager {
  private servers: any[] = [];
  private orchestrator: OrchestratorService;

  constructor() {
    this.orchestrator = new OrchestratorService();
  }

  async startAll(): Promise<void> {
    console.log('🚀 Starting Quick Test Services...\n');

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
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Start orchestrator
    console.log(`Starting orchestrator on port ${ORCHESTRATOR_CONFIG.port}...`);
    this.orchestrator.start(ORCHESTRATOR_CONFIG.port);

    console.log('\n✅ Quick test services started successfully!');
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
    
    console.log('\n🎯 Ready for testing!');
    console.log('💡 Now run: npm run test-quick');
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
const manager = new QuickTestManager();

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

export { QuickTestManager, SERVICE_CONFIGS };
