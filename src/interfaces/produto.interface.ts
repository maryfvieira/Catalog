import { ObjectId } from "mongodb";

export interface Produto {
  _id?: ObjectId; // Adic
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
}
