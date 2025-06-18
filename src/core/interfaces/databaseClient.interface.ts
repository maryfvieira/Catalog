import { Transaction } from "../unitofWork/transaction";
import { IRepository } from "./repository.interface";

export interface IDatabaseClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getRepository<T>(entity: string): IRepository<T>;
    startTransaction(): Promise<Transaction>;
  }