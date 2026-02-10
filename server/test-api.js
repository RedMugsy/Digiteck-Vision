// Test script for the contact form API
// Run with: node server/test-api.js

const testData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 555-123-4567",
  company: "Test Company",
  message: "This is a test message from the API test script.",
  interests: [
    "Digital Transformation Advisory",
    "Technology Development"
  ]
};

async function testContactAPI() {
  try {
    console.log('Testing Contact Form API...\n');
    console.log('Endpoint: http://localhost:3001/api/contact');
    console.log('Data:', JSON.stringify(testData, null, 2));
    console.log('\nSending request...\n');

    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS!');
      console.log('Response:', result);
      console.log('\nCheck:');
      console.log('1. server/logs/ for the logged message');
      console.log('2. info@digiteckvision.com inbox for the email');
    } else {
      console.log('❌ FAILED');
      console.log('Status:', response.status);
      console.log('Response:', result);
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\nMake sure the backend server is running:');
    console.log('  cd server && npm run dev');
  }
}

// Test health endpoint first
async function testHealth() {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    const data = await response.json();
    console.log('✅ Health Check:', data);
    return true;
  } catch (error) {
    console.error('❌ Backend server not running!');
    console.log('Start it with: cd server && npm run dev\n');
    return false;
  }
}

// Run tests
(async () => {
  const isHealthy = await testHealth();
  if (isHealthy) {
    console.log('');
    await testContactAPI();
  }
})();
