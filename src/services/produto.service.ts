import { Produto } from "../interfaces/produto.interface";

let produtos: Produto[] = [];
let nextId = 1;

export class ProdutoService {
  getAll(): Produto[] {
    return produtos;
  }

  getById(id: number): Produto | undefined {
    return produtos.find(p => p.id === id);
  }

  create(produto: Omit<Produto, "id">): Produto {
    const novoProduto: Produto = { id: nextId++, ...produto };
    produtos.push(novoProduto);
    return novoProduto;
  }

  update(id: number, dados: Partial<Omit<Produto, "id">>): Produto | null {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return null;

    produtos[index] = { ...produtos[index], ...dados };
    return produtos[index];
  }

  delete(id: number): boolean {
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return false;

    produtos.splice(index, 1);
    return true;
  }
}
