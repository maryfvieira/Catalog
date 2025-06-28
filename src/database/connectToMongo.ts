import { Db } from "mongodb";
import { MongoConnectionStrategyInterface } from "@database/mongo-connection-strategy.interface";
import { MongoConnectionStrategy } from "@database/mongo-connection-strategy";
import { MongoMemoryConnectionStrategy } from "@database/mongo-memory-connection-strategy";

export async function connectToMongo(): Promise<Db> {
    let strategy: MongoConnectionStrategyInterface;
  
    console.log(`${process.env.NODE_ENV} - ${process.env.CI}`);
    if (process.env.NODE_ENV === 'test' && process.env.CI === 'false') {
      console.log('in-memory strategy');
      strategy = new MongoMemoryConnectionStrategy();
      
    } else {
      console.log('db strategy');
      strategy = new MongoConnectionStrategy();
    }
  
    return strategy.connect();
  }

  export async function stopInMemoryMongo() {
    if (process.env.NODE_ENV === 'test' && process.env.CI === 'false') {
      const strategy = new MongoMemoryConnectionStrategy();
      await (strategy as any).stop?.();
    }
  }