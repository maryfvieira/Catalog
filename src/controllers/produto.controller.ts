import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";

export class ProdutoController {
  private service = new ProdutoService();

  getAll(req: Request, res: Response): Response {
    return res.json(this.service.getAll());
  }

  getById(req: Request<{ id: string }>, res: Response): Response {
    const id = parseInt(req.params.id);
    const produto = this.service.getById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(produto);
  }

  create(req: Request, res: Response): Response {
    const { nome, preco, descricao } = req.body;
    const novoProduto = this.service.create({ nome, preco, descricao });
    return res.status(201).json(novoProduto);
  }

  update(req: Request<{ id: string }>, res: Response): Response {
    const id = parseInt(req.params.id);
    const { nome, preco, descricao } = req.body;
    const atualizado = this.service.update(id, { nome, preco, descricao });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(atualizado);
  }

  delete(req: Request<{ id: string }>, res: Response): Response {
    const id = parseInt(req.params.id);
    const deletado = this.service.delete(id);
    if (!deletado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.status(204).send();
  }
}
