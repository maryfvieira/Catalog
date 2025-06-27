// src/services/produto.service.ts
import { Produto } from "../interfaces/produto.interface";
import { ProdutoRepository } from "../repositories/produto.repository";

export class ProdutoService {
  constructor(private repository: ProdutoRepository) {}

  async getAll(): Promise<Produto[]> {
    return this.repository.getAll();
  }

  async getById(id: number): Promise<Produto | null> {
    return this.repository.getById(id);
  }

  async create(produto: Omit<Produto, "id">): Promise<Produto> {
    const id = await this.repository.getNextId();
    const novoProduto = { id, ...produto };
    return this.repository.create(novoProduto);
  }

  async update(id: number, dados: Partial<Omit<Produto, "id">>): Promise<Produto | null> {
    return this.repository.update(id, dados);
  }

  async delete(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
