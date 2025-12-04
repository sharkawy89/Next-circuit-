const http = require('http');

console.log('Testing server connection...');

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`✅ Connected! Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error(`❌ Connection failed: ${e.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('❌ Request timeout');
  process.exit(1);
});

req.end();
