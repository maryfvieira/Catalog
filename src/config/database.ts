import { IDatabaseClient } from "../core/interfaces/databaseClient.interface";
import { UnitOfWork } from "../core/unitofWork/unitOfWork";
import { DatabaseClientFactory } from "../data/clients/databaseClientFactory";
import { Produto } from "../interfaces/produto.interface";
import { ProdutoRepository } from "../data/repositories/produtoRepository";


export class Database {
  private static uow: UnitOfWork;
  private static client: IDatabaseClient;

  static async connect() {
    this.client = DatabaseClientFactory.create();
    await this.client.connect();
    this.uow = new UnitOfWork(this.client);
  }

  static async disconnect() {
    await this.client.disconnect();
  }

  static getProdutoRepository(): ProdutoRepository {
    const genericRepo = this.uow.getRepository<Produto>('produtos');
    return new ProdutoRepository(genericRepo);
  }

  static getUnitOfWork(): UnitOfWork {
    return this.uow;
  }
}