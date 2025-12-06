const db = require('./lib/db');

async function testConnection() {
  console.log('📡 Testing MongoDB connection...\n');

  try {
    // Connect with retry logic
    await db.connectWithRetry(3);
    console.log('\n✅ Connected successfully!\n');

    // Get database instance
    const database = db.getDatabase('next-circuit');
    console.log('📦 Database:', database.name);

    // List collections
    const collections = await database.listCollections().toArray();
    console.log('📋 Collections found:', collections.length);
    if (collections.length > 0) {
      collections.forEach(col => console.log(`  - ${col.name}`));
    }

    // Run a ping command
    const adminDb = db.client.db('admin');
    const pingResult = await adminDb.command({ ping: 1 });
    console.log('\n🔔 Ping result:', pingResult);

    console.log('\n✅ All tests passed!');
    await db.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Connection test failed:', err.message);
    process.exit(1);
  }
}

testConnection();
