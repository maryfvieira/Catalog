import { IDatabaseClient } from "../../core/interfaces/databaseClient.interface";
import { IRepository } from "../../core/interfaces/repository.interface";
import { Transaction } from "../../core/unitofWork/transaction";
import { MemoryRepository } from "./memoryRepository";


export class MemoryClient implements IDatabaseClient {
  private repositories: Map<string, IRepository<any>> = new Map();

  async connect(): Promise<void> {
    console.log("Memory database connected");
  }

  async disconnect(): Promise<void> {
    console.log("Memory database disconnected");
    this.repositories.clear();
  }

  getRepository<T>(entity: string): IRepository<T> {
      if (!this.repositories.has(entity)) {
        this.repositories.set(entity, new MemoryRepository<T>());
      }
      return this.repositories.get(entity) as IRepository<T>;
    }

  async startTransaction(): Promise<Transaction> {
    return new Transaction(
      async () => console.log("Memory transaction committed"),
      async () => console.log("Memory transaction rolled back")
    );
  }
}