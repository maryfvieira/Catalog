import { MongoClient, Db, Collection } from 'mongodb';
import { IDatabaseClient } from '../../core/interfaces/databaseClient.interface';
import { IRepository } from '../../core/interfaces/repository.interface';
import { Transaction } from '../../core/unitofWork/transaction';

export class MongoDatabaseClient implements IDatabaseClient {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db();
    console.log("MongoDB connected");
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log("MongoDB disconnected");
    }
  }

  getRepository<T>(entity: string): IRepository<T> {
    if (!this.db) throw new Error("Database not connected");
    const collection = this.db.collection(entity);
    return new MongoRepository<T>(collection);
  }

  async startTransaction(): Promise<Transaction> {
    if (!this.client) throw new Error("Database not connected");
    
    const session = this.client.startSession();
    session.startTransaction();
    
    return new Transaction(
      async () => {
        await session.commitTransaction();
        session.endSession();
        console.log("MongoDB transaction committed");
      },
      async () => {
        await session.abortTransaction();
        session.endSession();
        console.log("MongoDB transaction rolled back");
      }
    );
  }
}