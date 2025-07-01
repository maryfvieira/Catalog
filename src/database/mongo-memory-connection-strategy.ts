import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoConnectionStrategyInterface } from '@database/mongo-connection-strategy.interface';

export class MongoMemoryConnectionStrategy implements MongoConnectionStrategyInterface {
    private mongoServer?: MongoMemoryServer;
  
    async connect(): Promise<Db> {
      this.mongoServer = await MongoMemoryServer.create();
      const uri = this.mongoServer.getUri();
      const dbName = process.env.MONGODB_DB_NAME;
      const timeout = parseInt(process.env.MONGODB_TIMEOUT || '10000', 10); // Default to 10 seconds
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: timeout }); // Set timeout to 10 seconds
  
      try {
        await client.connect();
        console.log('✅ Connected successfully to MongoDB (In-Memory)');
        return client.db(dbName);
      } catch (error) {
        console.error('❌ Connection to in-memory MongoDB failed:', error);
        await client.close();
        throw error;
      }
    }
  
    async stop() {
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
    }
  }
