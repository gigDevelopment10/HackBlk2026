import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { Domain } from '../types.js';

const PROTO_PATH = new URL('../../proto/service.proto', import.meta.url).pathname;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: Number,
  enums: String,
  defaults: true,
  oneofs: true,
});

const serviceline = grpc.loadPackageDefinition(packageDefinition).serviceline as any;

export class QuickTestScenarios {
  private orchestratorClient: any;

  constructor() {
    // Connect to orchestrator on port 6000
    this.orchestratorClient = new serviceline.Orchestrator(
      'localhost:6000',
      grpc.credentials.createInsecure()
    );
  }

  async runQuickTest(): Promise<void> {
    console.log('\n🧪 Quick Test Scenario...\n');

    try {
      await this.testBasicConnection();
      await this.testSingleService();
      
      console.log('\n✅ Quick test completed successfully!');
    } catch (error) {
      console.error('\n❌ Quick test failed:', error);
      console.log('\n💡 Make sure services are running with: npm run start-quick');
    }
  }

  private async testBasicConnection(): Promise<void> {
    console.log('🔌 Testing Basic Connection...');
    
    const listRequest = {
      task_id: 'quick_test_001',
      domain: 'orchestrator',
      operation: 'get_services',
      parameters: {},
      priority: 1,
      requester_id: 'quick_test'
    };

    const result = await this.makeRequest('getServiceList', listRequest);
    console.log('✅ Basic connection successful!');
    console.log(`📊 Found ${result.data.total_services} services`);
  }

  private async testSingleService(): Promise<void> {
    console.log('\n🎯 Testing Single Service Task...');
    
    const taskRequest = {
      task_id: 'quick_test_002',
      domain: 'advisory',
      operation: 'market_research',
      parameters: { segment: 'enterprise' },
      priority: 1,
      requester_id: 'quick_test'
    };

    const result = await this.makeRequest('distributeTask', taskRequest);
    console.log('✅ Single service test successful!');
    console.log(`📄 Task result: ${result.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`💬 Message: ${result.message}`);
  }

  private makeRequest(method: string, request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.orchestratorClient[method](request, (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

// Run quick test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const quickTest = new QuickTestScenarios();
  
  console.log('⚠️  Make sure quick services are running before executing test!');
  console.log('   Run: npm run start-quick');
  console.log('   Then: npm run test-quick\n');
  
  setTimeout(() => {
    quickTest.runQuickTest().catch(console.error);
  }, 2000); // Wait 2 seconds for services to start
}
