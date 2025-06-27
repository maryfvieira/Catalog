// src/repositories/produto.repository.ts
import { Produto } from "../interfaces/produto.interface";
import { Db } from "mongodb"; 

export class ProdutoRepository {
  private collectionName = "produtos";
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAll(): Promise<Produto[]> {
    return this.db.collection<Produto>(this.collectionName).find().toArray();
  }

  async getById(id: number): Promise<Produto | null> {
    return this.db.collection<Produto>(this.collectionName).findOne({ id });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.db.collection(this.collectionName).insertOne(produto);
    return produto;
  }

  async update(id: number, dados: Partial<Produto>): Promise<Produto | null> {
    const collection = this.db.collection<Produto>(this.collectionName);
    
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: dados },
      { returnDocument: 'after' }
    );
  
    if (result && 'value' in result) {
      return result.value as Produto | null;
    }
    
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.collection(this.collectionName).deleteOne({ id });
    return result.deletedCount === 1;
  }

  async getNextId(): Promise<number> {
    const last = await this.db
      .collection<Produto>(this.collectionName)
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    return last.length === 0 ? 1 : last[0].id + 1;
  }
}
export default ProdutoRepository;
