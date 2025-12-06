const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://adhamsharkawy185_db_user:zNT4ZR9EgVIaIFhS@next-circuit.ncjq9gj.mongodb.net/?appName=Next-circuit";

// Create a MongoClient with Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false;

/**
 * Connect to MongoDB with retry logic
 * @param {number} retries - Number of retry attempts (default: 5)
 */
const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📡 Connecting to MongoDB (attempt ${i + 1}/${retries})...`);
      await client.connect();
      
      // Verify connection with ping
      await client.db("admin").command({ ping: 1 });
      
      console.log('✅ MongoDB connected successfully');
      isConnected = true;
      return client;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${i + 1}/${retries} failed:`, err?.message || err);
      
      if (i === retries - 1) {
        console.error('📌 MongoDB connection failed after all retries.');
        console.error('📌 Ensure:');
        console.error('   1. Your IP is whitelisted in MongoDB Atlas Network Access');
        console.error('   2. Database user credentials are correct in MONGODB_URI');
        console.error('   3. MONGODB_URI format is correct: mongodb+srv://username:password@cluster.mongodb.net/?appName=...');
        process.exit(1);
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

/**
 * Get the MongoDB client
 */
const getClient = () => {
  if (!isConnected) {
    throw new Error('MongoDB client is not connected. Call connectWithRetry() first.');
  }
  return client;
};

/**
 * Disconnect from MongoDB
 */
const disconnect = async () => {
  if (isConnected) {
    await client.close();
    isConnected = false;
    console.log('📌 MongoDB disconnected');
  }
};

/**
 * Get a specific database
 * @param {string} dbName - Database name
 */
const getDatabase = (dbName = 'next-circuit') => {
  if (!isConnected) {
    throw new Error('MongoDB client is not connected.');
  }
  return client.db(dbName);
};

/**
 * Get a specific collection from a database
 * @param {string} dbName - Database name
 * @param {string} collectionName - Collection name
 */
const getCollection = (dbName, collectionName) => {
  return getDatabase(dbName).collection(collectionName);
};

module.exports = {
  client,
  connectWithRetry,
  getClient,
  disconnect,
  getDatabase,
  getCollection,
  isConnected: () => isConnected,
};
