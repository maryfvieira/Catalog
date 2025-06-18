import { IRepository } from "./repository.interface";

export interface IUnitOfWork {
  getRepository<T>(entity: string): IRepository<T>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  startTransaction(): Promise<void>;
}