import { IDatabaseClient } from "../interfaces/databaseClient.interface";
import { IRepository } from "../interfaces/repository.interface";
import { IUnitOfWork } from "../interfaces/unitOfWork.interface";
import { Transaction } from "./transaction";


export class UnitOfWork implements IUnitOfWork {
  private transaction: Transaction | null = null;

  constructor(private databaseClient: IDatabaseClient) {}

  async startTransaction(): Promise<void> {
    this.transaction = await this.databaseClient.startTransaction();
  }

  async commit(): Promise<void> {
    if (this.transaction) {
      await this.transaction.commit();
      this.transaction = null;
    }
  }

  async rollback(): Promise<void> {
    if (this.transaction) {
      await this.transaction.rollback();
      this.transaction = null;
    }
  }

  getRepository<T>(entity: string): IRepository<T> {
    return this.databaseClient.getRepository<T>(entity);
  }
}