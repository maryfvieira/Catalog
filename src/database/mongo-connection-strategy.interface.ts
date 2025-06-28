import { MongoClient, Db } from 'mongodb';

// Interface para estratégias de conexão
export interface MongoConnectionStrategyInterface {
  connect(): Promise<Db>;
}