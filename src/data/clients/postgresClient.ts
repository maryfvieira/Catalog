import { Pool, PoolClient } from 'pg';
import { IDatabaseClient } from '../../core/interfaces/databaseClient.interface';
import { Transaction } from '../../core/unitofWork/transaction';
import { IRepository } from '../../core/interfaces/repository.interface';
import { PostgresRepository } from './postgresRepository';

export class PostgresClient implements IDatabaseClient {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT || '5432'),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    });
  }

  async connect(): Promise<void> {
    this.client = await this.pool.connect();
    console.log("PostgreSQL connected");
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      this.client.release();
    }
    await this.pool.end();
    console.log("PostgreSQL disconnected");
  }

  getRepository<T>(entity: string): IRepository<T> {
    if (!this.client) throw new Error("Database not connected");
    return new PostgresRepository<T>(this.client, entity);
  }

  async startTransaction(): Promise<Transaction> {
    if (!this.client) throw new Error("Database not connected");
    
    await this.client.query('BEGIN');
    return {
      commit: async () => {
        await this.client!.query('COMMIT');
        console.log("PostgreSQL transaction committed");
      },
      rollback: async () => {
        await this.client!.query('ROLLBACK');
        console.log("PostgreSQL transaction rolled back");
      }
    };
  }
}