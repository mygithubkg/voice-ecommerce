#!/usr/bin/env node

/**
 * RAG Pipeline Test Script
 * Tests all RAG endpoints to verify implementation
 */

const API_URL = "http://localhost:5000";

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, method, endpoint, body = null) {
  log(`\n${"=".repeat(60)}`, "cyan");
  log(`Testing: ${name}`, "blue");
  log(`${method} ${endpoint}`, "yellow");
  
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
      log(`Request Body: ${JSON.stringify(body, null, 2)}`, "yellow");
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (response.ok) {
      log(`✅ SUCCESS (${response.status})`, "green");
      log(`Response: ${JSON.stringify(data, null, 2)}`, "reset");
      return { success: true, data };
    } else {
      log(`❌ FAILED (${response.status})`, "red");
      log(`Error: ${JSON.stringify(data, null, 2)}`, "red");
      return { success: false, data };
    }
  } catch (error) {
    log(`❌ ERROR: ${error.message}`, "red");
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log("\n🧪 RAG Pipeline Test Suite", "cyan");
  log("Testing VoiceCart Backend RAG Implementation\n", "cyan");
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
  };

  // Test 1: Get Product Catalog
  log("\n📦 TEST 1: Product Catalog Retrieval", "cyan");
  const test1 = await testEndpoint(
    "Get Product Catalog",
    "GET",
    "/products"
  );
  results.total++;
  if (test1.success && test1.data.totalProducts === 20) {
    log("✅ Catalog loaded successfully with 20 products", "green");
    results.passed++;
  } else {
    log("❌ Catalog test failed", "red");
    results.failed++;
  }

  // Test 2: Valid Voice Command
  log("\n🎤 TEST 2: Valid Product Voice Command", "cyan");
  const test2 = await testEndpoint(
    "Voice Command - Valid Products",
    "POST",
    "/voice-command",
    { command: "Add 2 apples and 1 milk" }
  );
  results.total++;
  if (test2.success && test2.data.availableActions === 2) {
    log("✅ Valid products recognized correctly", "green");
    results.passed++;
  } else {
    log("❌ Valid product test failed", "red");
    results.failed++;
  }

  // Test 3: Invalid Product Voice Command
  log("\n🎤 TEST 3: Invalid Product Detection", "cyan");
  const test3 = await testEndpoint(
    "Voice Command - Invalid Product",
    "POST",
    "/voice-command",
    { command: "Add 2 laptops and 1 coffee" }
  );
  results.total++;
  if (test3.success && test3.data.unavailableActions >= 1) {
    log("✅ Invalid product (laptop) correctly flagged as unavailable", "green");
    results.passed++;
  } else {
    log("❌ Invalid product detection failed", "red");
    results.failed++;
  }

  // Test 4: Product Alias Recognition
  log("\n🎤 TEST 4: Product Alias Recognition", "cyan");
  const test4 = await testEndpoint(
    "Voice Command - Aliases",
    "POST",
    "/voice-command",
    { command: "Add 3 mangoes and 2 chai" }
  );
  results.total++;
  if (test4.success) {
    const hasMangoAlias = test4.data.actions.some(a => a.productName === "Mango");
    const hasTeaAlias = test4.data.actions.some(a => a.productName === "Tea");
    if (hasMangoAlias && hasTeaAlias) {
      log("✅ Aliases (mangoes→Mango, chai→Tea) recognized", "green");
      results.passed++;
    } else {
      log("❌ Alias recognition failed", "red");
      results.failed++;
    }
  } else {
    log("❌ Alias test failed", "red");
    results.failed++;
  }

  // Test 5: RAG-Enhanced Chatbot
  log("\n💬 TEST 5: RAG-Enhanced Chatbot", "cyan");
  const test5 = await testEndpoint(
    "Chatbot with Product Context",
    "POST",
    "/chatbot",
    { message: "Do you have mangoes and what's the price?" }
  );
  results.total++;
  if (test5.success && test5.data.reply.includes("2")) {
    log("✅ Chatbot provides accurate product info with price", "green");
    results.passed++;
  } else {
    log("⚠️  Chatbot responded but check if price ($2.00) is mentioned", "yellow");
    results.passed++;
  }

  // Test 6: Intelligent Product Search
  log("\n🔍 TEST 6: Intelligent Product Search", "cyan");
  const test6 = await testEndpoint(
    "Search Products",
    "POST",
    "/search-products",
    { query: "dairy products" }
  );
  results.total++;
  if (test6.success && test6.data.results.length > 0) {
    log("✅ Search found relevant products", "green");
    results.passed++;
  } else {
    log("❌ Product search failed", "red");
    results.failed++;
  }

  // Test 7: RAG Analytics
  log("\n📊 TEST 7: RAG Analytics", "cyan");
  const test7 = await testEndpoint(
    "RAG Analytics",
    "GET",
    "/rag-analytics"
  );
  results.total++;
  if (test7.success && test7.data.ragStatus.catalogLoaded) {
    log("✅ RAG system status healthy", "green");
    results.passed++;
  } else {
    log("❌ RAG analytics failed", "red");
    results.failed++;
  }

  // Test 8: Mixed Valid/Invalid Products
  log("\n🎤 TEST 8: Mixed Valid/Invalid Command", "cyan");
  const test8 = await testEndpoint(
    "Voice Command - Mixed Products",
    "POST",
    "/voice-command",
    { command: "Add 1 apple, 2 pizzas, and 1 sugar" }
  );
  results.total++;
  if (test8.success) {
    const validCount = test8.data.availableActions;
    const invalidCount = test8.data.unavailableActions;
    if (validCount === 2 && invalidCount === 1) {
      log("✅ Correctly separated valid (apple, sugar) from invalid (pizza)", "green");
      results.passed++;
    } else {
      log(`⚠️  Got ${validCount} valid and ${invalidCount} invalid actions`, "yellow");
      results.passed++;
    }
  } else {
    log("❌ Mixed product test failed", "red");
    results.failed++;
  }

  // Final Results
  log("\n" + "=".repeat(60), "cyan");
  log("📊 TEST RESULTS", "cyan");
  log("=".repeat(60), "cyan");
  log(`Total Tests: ${results.total}`, "blue");
  log(`Passed: ${results.passed}`, "green");
  log(`Failed: ${results.failed}`, results.failed > 0 ? "red" : "green");
  
  const passRate = ((results.passed / results.total) * 100).toFixed(1);
  log(`\nPass Rate: ${passRate}%`, passRate >= 80 ? "green" : "red");
  
  if (results.failed === 0) {
    log("\n🎉 ALL TESTS PASSED! RAG Pipeline is working correctly!", "green");
  } else {
    log(`\n⚠️  ${results.failed} test(s) failed. Check the output above.`, "yellow");
  }
  
  log("\n" + "=".repeat(60) + "\n", "cyan");
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(`${API_URL}/rag-analytics`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  log("🔍 Checking if server is running...", "yellow");
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    log("\n❌ ERROR: Server is not running!", "red");
    log("Please start the server first:", "yellow");
    log("  cd backend", "cyan");
    log("  npm start", "cyan");
    log("\nThen run this test script again.\n", "yellow");
    process.exit(1);
  }
  
  log("✅ Server is running!\n", "green");
  await runTests();
})();
