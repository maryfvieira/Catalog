import { container } from "tsyringe";
import { ProdutoRepository } from "./repositories/produto.repository";
import { ProdutoService } from "./services/produto.service";
import connectToMongo from "./database/mongo";
import { Db } from "mongodb";

export async function registerDependencies() {
  const db = await connectToMongo();
  
  // Registro das dependências
  
  container.registerInstance<Db>("MongoDB", db);
  container.registerSingleton<ProdutoRepository>(
    "ProdutoRepository",
    ProdutoRepository
  );
  container.registerSingleton<ProdutoService>(
    "ProdutoService",
    ProdutoService
  );
}

export default container;