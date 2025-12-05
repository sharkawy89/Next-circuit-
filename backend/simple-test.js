const http = require('http');

console.log('Testing server connection...');

// Allow overrides using API_BASE env or use PORT/HOST when available
const API_BASE = process.env.API_BASE || `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 5000}/api`;
const url = new URL(API_BASE + '/health');

const options = {
  hostname: url.hostname,
  port: url.port || 80,
  path: url.pathname + url.search,
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
