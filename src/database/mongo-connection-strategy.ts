import { Db, MongoClient } from 'mongodb';
import { MongoConnectionStrategyInterface } from '@database/mongo-connection-strategy.interface';

export class MongoConnectionStrategy implements MongoConnectionStrategyInterface {
    async connect(): Promise<Db> {
        const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
        const dbUser = process.env.MONGODB_USERNAME;
        const dbPassword = process.env.MONGODB_PASSWORD;
        const dbName = process.env.MONGODB_DB_NAME;
        const port = process.env.MONGODB_PORT || '27017';
        const timeout = parseInt(process.env.MONGODB_TIMEOUT || '10000', 10); // Default to 10 seconds
    
        if (!clusterAddress || !dbUser || !dbPassword || !dbName) {
          throw new Error('❌ Variáveis de ambiente MongoDB não configuradas corretamente.');
        }
    
        const uri = `mongodb://${dbUser}:${dbPassword}@${clusterAddress}:${port}/${dbName}?authSource=admin`;
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: timeout }); // Set timeout to 10 seconds
    
        try {
          await client.connect();
          await client.db(dbName).command({ ping: 1 });
          console.log(`✅ Connected successfully to MongoDB in ${process.env.NODE_ENV}`);
          return client.db(dbName);
        } catch (error) {
          console.error('❌ Connection to MongoDB failed:', error);
          await client.close();
          throw error;
        }
      }
}
