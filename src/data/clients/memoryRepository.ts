import { IRepository } from "../../core/interfaces/repository.interface";


export class MemoryRepository<T extends { id: number }> implements IRepository<T> {
  private data: T[] = [];
  private idCounter = 1;

  async create(entity: Partial<T>): Promise<T> {
    const newEntity = { ...entity, id: this.idCounter++ } as T;
    this.data.push(newEntity);
    return newEntity;
  }

  async update(id: number, entity: Partial<T>): Promise<T | null> {
    const index = this.data.findIndex(e => e.id == id);
    if (index === -1) return null;
    
    this.data[index] = { ...this.data[index], ...entity, id };
    return this.data[index];
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.data.length;
    this.data = this.data.filter(e => e.id != id);
    return this.data.length < initialLength;
  }

  async findById(id: number): Promise<T | null> {
    return this.data.find(e => e.id == id) || null;
  }

  async findAll(): Promise<T[]> {
    return [...this.data];
  }
}