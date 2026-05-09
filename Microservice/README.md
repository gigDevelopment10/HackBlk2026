# Service Line Alpha - Distributed MCP Server Architecture

A distributed computing system implementing 4 MCP (Model Context Protocol) servers with gRPC communication for enterprise service lines.

## How It Works

### Flow
```
Test Client / Your App
        │
        ▼ gRPC call
┌───────────────────┐
│   Orchestrator    │  :6000  ← single entry point
│  (task router)    │
└─────────┬─────────┘
          │ routes by domain
    ┌─────┴──────────────────────────┐
    ▼         ▼          ▼           ▼
Advisory   Marketing  Technology  Engineering
 :6001      :6002       :6003       :6004
```

### Step-by-Step

**1. You send a task request:**
```ts
{
  domain: 'advisory',           // which service to use
  operation: 'market_research', // what to do
  parameters: { segment: 'enterprise' },
  priority: 1
}
```

**2. Orchestrator** receives it → looks up its registry → finds the right service → forwards via gRPC

**3. Domain service** validates with Zod, executes the operation, reads from shared data store, returns result

**4. Orchestrator** returns the result back to the caller

### Key Files

| File | Role |
|---|---|
| `proto/service.proto` | Defines gRPC message contracts |
| `src/common/data-source.ts` | Shared mock data store all services read from |
| `src/servers/*-server.ts` | One MCP server per domain — handles tasks |
| `src/orchestrator/orchestrator.ts` | Routes tasks to the right service |
| `src/index-quick-test.ts` | Boots all services and registers them |

### gRPC Methods (per service)

Each server exposes 3 gRPC methods:
- **`ExecuteTask`** — runs domain-specific operations (market research, code review, etc.)
- **`HealthCheck`** — lets the orchestrator monitor if a service is alive
- **`RegisterService`** — registers the service into the orchestrator's registry

### Common Data Source

All 4 servers share one `CommonDataSource` — pre-loaded with mock data per domain (`advisory:market_trends`, `marketing:campaigns`, etc.) that services read from when executing tasks.

### In One Sentence
> A client sends a task → orchestrator routes it to the right domain service via gRPC → the service validates + executes it using shared data → result flows back.

---

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Advisory      │    │   Marketing     │    │   Technology    │    │   Engineering   │
│   Service       │    │   Service       │    │   Service       │    │   Service       │
│   :5001         │    │   :5002         │    │   :5003         │    │   :5004         │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │                      │
          └──────────────────────┼──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │      Orchestrator        │
                    │      Service             │
                    │      :5000               │
                    └───────────────────────────┘
```

## Service Lines & Capabilities

### Advisory Service (Port 5001)
- **Market Research**: Market trends, consumer insights, competitive analysis
- **Strategic Analysis**: SWOT analysis, business planning, strategic priorities
- **Competitive Intelligence**: Market share analysis, competitive positioning
- **Risk Assessment**: Risk matrix, mitigation strategies, compliance monitoring

### Marketing Service (Port 5002)
- **Content Creation**: Blog posts, articles, marketing copy generation
- **Campaign Management**: Campaign performance, budget optimization, targeting
- **SEO Optimization**: Keyword analysis, content optimization, competitor SEO
- **Social Media Strategy**: Platform-specific strategies, engagement planning

### Technology Service (Port 5003)
- **Data Processing**: Analytics processing, data quality assessment
- **System Integration**: API integration, data synchronization, system health
- **API Development**: REST/GraphQL APIs, documentation, security
- **Performance Optimization**: System tuning, bottleneck analysis, scaling

### Engineering Service (Port 5004)
- **Code Review**: Quality assessment, best practices, security review
- **Security Analysis**: Vulnerability assessment, compliance checking
- **Architecture Design**: System patterns, technology stack planning
- **Quality Assurance**: Test coverage, quality metrics, CI/CD optimization

## Quick Start

### Prerequisites
- Node.js 18+
- TypeScript support

### Installation
```bash
cd /HackBlk2026/Microservice/service-line-alpha
npm install
```

### Running the System

1. **Start All Services**
```bash
npm start
```

2. **Run Test Scenarios** (in separate terminal)
```bash
npm test
```

3. **Development Mode**
```bash
npm run dev
```

### Service Status
When started, you'll see:
```
🚀 Starting Service Line Architecture...

Starting advisory service on port 5001...
Starting marketing service on port 5002...
Starting technology service on port 5003...
Starting engineering service on port 5004...
Starting orchestrator on port 5000...

✅ All services started successfully!

📊 Service Status:
┌─────────────────┬─────────────┬───────────┐
│ Service         │ Domain      │ Port     │
├─────────────────┼─────────────┼───────────┤
│ advisory-service-01 │ advisory    │ 5001     │
│ marketing-service-01 │ marketing   │ 5002     │
│ technology-service-01 │ technology  │ 5003     │
│ engineering-service-01 │ engineering │ 5004     │
├─────────────────┼─────────────┼───────────┤
│ orchestrator-01 │ orchestration │ 5000     │
└─────────────────┴─────────────┴───────────┘

🎯 Ready for distributed computing!
```

## Test Scenarios

The system includes comprehensive test scenarios:

1. **Service Health Checks**: Monitors all service health
2. **Individual Service Tests**: Tests each service line capabilities
3. **Distributed Computing**: Complex workflow across multiple services

### Example Test Output
```
🧪 Starting Test Scenarios...

🏥 Testing Service Health...
✅ Health check completed

📊 Testing Advisory Services...
✅ Advisory market_research: PASS
✅ Advisory strategic_analysis: PASS
✅ Advisory competitive_intelligence: PASS
✅ Advisory risk_assessment: PASS

📢 Testing Marketing Services...
✅ Marketing content_creation: PASS
✅ Marketing campaign_management: PASS
✅ Marketing seo_optimization: PASS
✅ Marketing social_media_strategy: PASS

⚙️ Testing Technology Services...
✅ Technology data_processing: PASS
✅ Technology system_integration: PASS
✅ Technology api_development: PASS
✅ Technology performance_optimization: PASS

🔧 Testing Engineering Services...
✅ Engineering code_review: PASS
✅ Engineering security_analysis: PASS
✅ Engineering architecture_design: PASS
✅ Engineering quality_assurance: PASS

🌐 Testing Distributed Computing Scenario...
Step 1 (advisory.market_research): ✅ PASS
Step 2 (marketing.campaign_management): ✅ PASS
Step 3 (technology.system_integration): ✅ PASS
Step 4 (engineering.quality_assurance): ✅ PASS
✅ Distributed computing workflow completed!

✅ All test scenarios completed successfully!
```

## Common Data Source

All services share a common data source that provides:
- **Market Trends Data**: For advisory and marketing services
- **Campaign Performance**: For marketing optimization
- **System Health Metrics**: For technology monitoring
- **Project Quality Data**: For engineering assessments

## Distributed Computing Features

### Task Distribution
- Automatic routing to appropriate service based on domain
- Load balancing and failover capabilities
- Priority-based task execution

### Service Monitoring
- Real-time health checks (every 30 seconds)
- Service registry management
- Automatic service discovery

### Error Handling
- Graceful degradation when services are unavailable
- Comprehensive error reporting
- Recovery mechanisms

## API Examples

### Direct Service Call
```typescript
// Call advisory service directly
const advisoryClient = new serviceline.ServiceLine('localhost:5001', grpc.credentials.createInsecure());

const request = {
  task_id: 'task_001',
  domain: 'advisory',
  operation: 'market_research',
  parameters: { segment: 'enterprise' },
  priority: 1,
  requester_id: 'client_app'
};

advisoryClient.executeTask(request, (error, response) => {
  console.log('Market Research Result:', response);
});
```

### Orchestrated Call
```typescript
// Use orchestrator for distributed execution
const orchestratorClient = new serviceline.Orchestrator('localhost:5000', grpc.credentials.createInsecure());

orchestratorClient.distributeTask(request, (error, response) => {
  console.log('Distributed Task Result:', response);
});
```

## Configuration

### Environment Variables
```bash
# Service Ports
ADVISORY_PORT=5001
MARKETING_PORT=5002
TECHNOLOGY_PORT=5003
ENGINEERING_PORT=5004
ORCHESTRATOR_PORT=5000

# Service Hosts
SERVICE_HOST=localhost
```

### Custom Service Configuration
Modify `SERVICE_CONFIGS` in `src/index.ts` to adjust ports and hosts.

## Architecture Benefits

1. **Scalability**: Each service can scale independently
2. **Resilience**: Service isolation prevents cascading failures
3. **Maintainability**: Clear domain boundaries and responsibilities
4. **Flexibility**: Easy to add new service lines or capabilities
5. **Observability**: Comprehensive monitoring and health checks

## Development Notes

- **Protocol Buffers**: gRPC definitions in `proto/service.proto`
- **Type Safety**: Full TypeScript support with Zod validation
- **Error Handling**: Comprehensive error management across services
- **Testing**: Built-in test scenarios for validation

## Future Enhancements

1. **Service Mesh**: Add Istio/Linkerd for advanced traffic management
2. **Load Balancing**: Implement sophisticated load balancing algorithms
3. **Caching**: Add Redis caching for improved performance
4. **Metrics**: Add Prometheus metrics and Grafana dashboards
5. **Security**: Implement mTLS and advanced authentication

## Troubleshooting

### Common Issues
- **Port Conflicts**: Ensure ports 5000-5004 are available
- **Service Startup**: Services start sequentially with 1-second delays
- **Test Failures**: Ensure all services are running before testing

### Health Check
```bash
# Check if services are responding
nc -z localhost 5000  # Orchestrator
nc -z localhost 5001  # Advisory
nc -z localhost 5002  # Marketing
nc -z localhost 5003  # Technology
nc -z localhost 5004  # Engineering
```

---
