import { IRepository } from '../../core/interfaces/repository.interface';

import { PoolClient } from 'pg';

export class PostgresRepository<T> implements IRepository<T> {
  constructor(private client: PoolClient, private tableName: string) {}

  async create(entity: Partial<T>): Promise<T> {
    const keys = Object.keys(entity).join(', ');
    const values = Object.values(entity);
    const placeholders = values.map((_, i) => `$${i+1}`).join(', ');
    
    const query = `
      INSERT INTO ${this.tableName} (${keys})
      VALUES (${placeholders})
      RETURNING *
    `;
    
    const result = await this.client.query(query, values);
    return result.rows[0] as T;
  }

  async update(id: string | number, entity: Partial<T>): Promise<T | null> {
    const entries = Object.entries(entity);
    const setClause = entries.map(([key], i) => `${key} = $${i+1}`).join(', ');
    const values = [...entries.map(([, value]) => value), id];
    
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *
    `;
    
    const result = await this.client.query(query, values);
    return result.rows[0] as T || null;
  }

  async delete(id: string | number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    const result = await this.client.query(query, [id]);
    return result.rowCount!=null && result.rowCount > 0;
  }

  async findById(id: string | number): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await this.client.query(query, [id]);
    return result.rows[0] as T || null;
  }

  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await this.client.query(query);
    return result.rows as T[];
  }
}