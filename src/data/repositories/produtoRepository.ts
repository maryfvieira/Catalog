import { Produto } from '../../interfaces/produto.interface';
import { IRepository } from "../../core/interfaces/repository.interface";

export class ProdutoRepository implements IRepository<Produto> {
  constructor(private repository: IRepository<Produto>) {}

  create(entity: Partial<Produto>): Promise<Produto> {
    return this.repository.create(entity);
  }

  update(id: string | number, entity: Partial<Produto>): Promise<Produto | null> {
    return this.repository.update(id, entity);
  }

  delete(id: string | number): Promise<boolean> {
    return this.repository.delete(id);
  }

  findById(id: string | number): Promise<Produto | null> {
    return this.repository.findById(id);
  }

  findAll(): Promise<Produto[]> {
    return this.repository.findAll();
  }
}