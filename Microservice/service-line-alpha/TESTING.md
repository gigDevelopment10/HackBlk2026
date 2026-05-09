# MCP Server Testing Guide

## 🚀 Quick Start Testing

### Method 1: Automated Testing (Recommended)
```bash
# Start services and run all tests automatically
./test-runner.js
```

### Method 2: Step-by-Step Testing
```bash
# Terminal 1: Start services
npm start

# Terminal 2: Run test scenarios (after services start)
npm test

# Terminal 3: Manual testing
node manual-test.js
```

## 🧪 Testing Methods

### 1. Built-in Test Scenarios
The system includes comprehensive test scenarios that validate:

- **Service Health**: Monitors all 4 service lines
- **Individual Service Tests**: Tests each service's capabilities
- **Distributed Computing**: Multi-service workflow validation
- **Error Handling**: Graceful failure scenarios

**Run with:**
```bash
npm test
```

### 2. Manual Service Testing
Test individual services directly:

```bash
node manual-test.js
```

This tests:
- ✅ Health checks for each service
- ✅ Sample task execution
- ✅ Orchestrator coordination
- ✅ Service registry management

### 3. Distributed Computing Workflow
Test real-world scenarios:

```bash
# Start services
npm start

# In another terminal, test distributed workflow
curl -X POST localhost:5000 \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "workflow_001",
    "domain": "advisory",
    "operation": "market_research",
    "parameters": {"segment": "enterprise"},
    "priority": 1,
    "requester_id": "test_client"
  }'
```

## 🔍 Service-Specific Testing

### Advisory Service Tests
- **Market Research**: `market_research` operation
- **Strategic Analysis**: `strategic_analysis` operation
- **Competitive Intelligence**: `competitive_intelligence` operation
- **Risk Assessment**: `risk_assessment` operation

### Marketing Service Tests
- **Content Creation**: `content_creation` operation
- **Campaign Management**: `campaign_management` operation
- **SEO Optimization**: `seo_optimization` operation
- **Social Media Strategy**: `social_media_strategy` operation

### Technology Service Tests
- **Data Processing**: `data_processing` operation
- **System Integration**: `system_integration` operation
- **API Development**: `api_development` operation
- **Performance Optimization**: `performance_optimization` operation

### Engineering Service Tests
- **Code Review**: `code_review` operation
- **Security Analysis**: `security_analysis` operation
- **Architecture Design**: `architecture_design` operation
- **Quality Assurance**: `quality_assurance` operation

## 📊 Expected Test Results

### Successful Test Output
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

## 🛠️ Troubleshooting

### Common Issues
1. **Port Already in Use**: Change ports in `src/index.ts`
2. **Services Not Starting**: Check if all dependencies are installed
3. **Test Failures**: Ensure services are fully started before running tests

### Health Check Commands
```bash
# Check if services are responding
nc -z localhost 5000 && echo "Orchestrator: OK" || echo "Orchestrator: FAIL"
nc -z localhost 5001 && echo "Advisory: OK" || echo "Advisory: FAIL"
nc -z localhost 5002 && echo "Marketing: OK" || echo "Marketing: FAIL"
nc -z localhost 5003 && echo "Technology: OK" || echo "Technology: FAIL"
nc -z localhost 5004 && echo "Engineering: OK" || echo "Engineering: FAIL"
```

## 🎯 Advanced Testing

### Load Testing
```bash
# Install load testing tool
npm install -g artillery

# Run load test
artillery run load-test.yml
```

### Integration Testing
```bash
# Test with external clients
node integration-test.js
```

### Performance Monitoring
```bash
# Monitor service performance
npm run monitor
```

## 📝 Test Customization

### Adding New Tests
1. Edit `src/test/test-scenarios.ts`
2. Add new test methods
3. Update test runner

### Custom Test Parameters
Modify test parameters in the test files:
- `src/test/test-scenarios.ts`
- `manual-test.js`

## 🎉 Testing Best Practices

1. **Always start services before running tests**
2. **Wait 3-5 seconds for services to fully initialize**
3. **Check service health before running complex tests**
4. **Use different terminals for services and tests**
5. **Monitor logs for debugging**

## 📚 Test Documentation

- **Proto Definitions**: `proto/service.proto`
- **Test Scenarios**: `src/test/test-scenarios.ts`
- **Manual Tests**: `manual-test.js`
- **Service Definitions**: `src/servers/*.ts`

---

**Happy Testing! 🚀**
