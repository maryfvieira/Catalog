import { IDatabaseClient } from "../../core/interfaces/databaseClient.interface";
import { MemoryClient } from "./memoryClient";
import { MongoDatabaseClient } from "./mongoClient";
import { PostgresClient } from "./postgresClient";

export class DatabaseClientFactory {
  static create(): IDatabaseClient {
    const dbType = process.env.DB_TYPE || 'memory';
    
    switch (dbType) {
      case 'postgres':
        return new PostgresClient();
      case 'mongo':
        return new MongoDatabaseClient();
      case 'memory':
      default:
        return new MemoryClient();
    }
  }
}