import { IEntity } from "../../interfaces/entity.interface";

export interface IRepository<T extends IEntity> {
  create(entity: Partial<T>): Promise<T>;
  update(id: string | number, entity: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  findById(id: string | number): Promise<T | null>;
  findAll(): Promise<T[]>;
}