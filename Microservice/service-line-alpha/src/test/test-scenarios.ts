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

export class TestScenarios {
  private orchestratorClient: any;

  constructor() {
    this.orchestratorClient = new serviceline.Orchestrator(
      'localhost:5000',
      grpc.credentials.createInsecure()
    );
  }

  async runAllTests(): Promise<void> {
    console.log('\n🧪 Starting Test Scenarios...\n');

    try {
      await this.testServiceHealth();
      await this.testAdvisoryServices();
      await this.testMarketingServices();
      await this.testTechnologyServices();
      await this.testEngineeringServices();
      await this.testDistributedComputing();
      
      console.log('\n✅ All test scenarios completed successfully!');
    } catch (error) {
      console.error('\n❌ Test scenarios failed:', error);
    }
  }

  private async testServiceHealth(): Promise<void> {
    console.log('🏥 Testing Service Health...');
    
    const healthRequest = {
      task_id: 'health_check_001',
      domain: 'advisory',
      operation: 'health_check',
      parameters: {},
      priority: 1,
      requester_id: 'test-suite'
    };

    const result = await this.makeRequest('monitorServices', healthRequest);
    console.log('Health check result:', JSON.stringify(result, null, 2));
  }

  private async testAdvisoryServices(): Promise<void> {
    console.log('\n📊 Testing Advisory Services...');
    
    const tests = [
      {
        operation: 'market_research',
        parameters: { segment: 'enterprise' }
      },
      {
        operation: 'strategic_analysis',
        parameters: { business_unit: 'technology' }
      },
      {
        operation: 'competitive_intelligence',
        parameters: { competitor: 'tech_corp' }
      },
      {
        operation: 'risk_assessment',
        parameters: { project: 'digital_transformation' }
      }
    ];

    for (const test of tests) {
      const request = {
        task_id: `advisory_${test.operation}_${Date.now()}`,
        domain: 'advisory' as Domain,
        operation: test.operation,
        parameters: test.parameters,
        priority: 2,
        requester_id: 'test-suite'
      };

      const result = await this.makeRequest('distributeTask', request);
      console.log(`✅ Advisory ${test.operation}:`, result.success ? 'PASS' : 'FAIL');
    }
  }

  private async testMarketingServices(): Promise<void> {
    console.log('\n📢 Testing Marketing Services...');
    
    const tests = [
      {
        operation: 'content_creation',
        parameters: { content_type: 'blog', topic: 'distributed_computing' }
      },
      {
        operation: 'campaign_management',
        parameters: { campaign_name: 'Q4_Launch', budget: '75000' }
      },
      {
        operation: 'seo_optimization',
        parameters: { page_url: '/products/cloud-services' }
      },
      {
        operation: 'social_media_strategy',
        parameters: { platform: 'linkedin' }
      }
    ];

    for (const test of tests) {
      const request = {
        task_id: `marketing_${test.operation}_${Date.now()}`,
        domain: 'marketing' as Domain,
        operation: test.operation,
        parameters: test.parameters,
        priority: 2,
        requester_id: 'test-suite'
      };

      const result = await this.makeRequest('distributeTask', request);
      console.log(`✅ Marketing ${test.operation}:`, result.success ? 'PASS' : 'FAIL');
    }
  }

  private async testTechnologyServices(): Promise<void> {
    console.log('\n⚙️ Testing Technology Services...');
    
    const tests = [
      {
        operation: 'data_processing',
        parameters: { data_type: 'analytics', volume: 'large' }
      },
      {
        operation: 'system_integration',
        parameters: { system_a: 'crm', system_b: 'erp' }
      },
      {
        operation: 'api_development',
        parameters: { api_type: 'graphql', complexity: 'high' }
      },
      {
        operation: 'performance_optimization',
        parameters: { target: 'database' }
      }
    ];

    for (const test of tests) {
      const request = {
        task_id: `technology_${test.operation}_${Date.now()}`,
        domain: 'technology' as Domain,
        operation: test.operation,
        parameters: test.parameters,
        priority: 2,
        requester_id: 'test-suite'
      };

      const result = await this.makeRequest('distributeTask', request);
      console.log(`✅ Technology ${test.operation}:`, result.success ? 'PASS' : 'FAIL');
    }
  }

  private async testEngineeringServices(): Promise<void> {
    console.log('\n🔧 Testing Engineering Services...');
    
    const tests = [
      {
        operation: 'code_review',
        parameters: { repository: 'backend', branch: 'feature/api-v2' }
      },
      {
        operation: 'security_analysis',
        parameters: { target: 'authentication_service' }
      },
      {
        operation: 'architecture_design',
        parameters: { system_type: 'microservices' }
      },
      {
        operation: 'quality_assurance',
        parameters: { test_type: 'comprehensive' }
      }
    ];

    for (const test of tests) {
      const request = {
        task_id: `engineering_${test.operation}_${Date.now()}`,
        domain: 'engineering' as Domain,
        operation: test.operation,
        parameters: test.parameters,
        priority: 2,
        requester_id: 'test-suite'
      };

      const result = await this.makeRequest('distributeTask', request);
      console.log(`✅ Engineering ${test.operation}:`, result.success ? 'PASS' : 'FAIL');
    }
  }

  private async testDistributedComputing(): Promise<void> {
    console.log('\n🌐 Testing Distributed Computing Scenario...');
    
    // Simulate a complex business workflow that requires multiple services
    const businessWorkflow = [
      {
        domain: 'advisory' as Domain,
        operation: 'market_research',
        parameters: { segment: 'enterprise' },
        priority: 1
      },
      {
        domain: 'marketing' as Domain,
        operation: 'campaign_management',
        parameters: { campaign_name: 'Enterprise_Launch', budget: '100000' },
        priority: 2
      },
      {
        domain: 'technology' as Domain,
        operation: 'system_integration',
        parameters: { system_a: 'marketing_automation', system_b: 'crm' },
        priority: 2
      },
      {
        domain: 'engineering' as Domain,
        operation: 'quality_assurance',
        parameters: { test_type: 'integration' },
        priority: 3
      }
    ];

    console.log('Executing distributed workflow...');
    
    for (let i = 0; i < businessWorkflow.length; i++) {
      const step = businessWorkflow[i];
      if (!step) continue;
      
      const request = {
        task_id: `workflow_step_${i + 1}_${Date.now()}`,
        domain: step.domain,
        operation: step.operation,
        parameters: step.parameters,
        priority: step.priority,
        requester_id: 'distributed_workflow'
      };

      const result = await this.makeRequest('distributeTask', request);
      console.log(`Step ${i + 1} (${step.domain}.${step.operation}):`, result.success ? '✅ PASS' : '❌ FAIL');
      
      // Simulate workflow delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('✅ Distributed computing workflow completed!');
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

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const testRunner = new TestScenarios();
  
  console.log('⚠️  Make sure all services are running before executing tests!');
  console.log('   Run: npm start');
  console.log('   Then: npm run test\n');
  
  setTimeout(() => {
    testRunner.runAllTests().catch(console.error);
  }, 3000); // Wait 3 seconds for services to fully start
}
