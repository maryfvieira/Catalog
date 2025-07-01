// src/controllers/produto.controller.ts
import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProdutoController {
  constructor(
    @inject("ProdutoService") private service: ProdutoService
  ) {}

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const produtos = await this.service.getAll();
    return res.json(produtos);
  };

  getById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const produto = await this.service.getById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(produto);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { nome, preco, descricao } = req.body;
    const novoProduto = await this.service.create({ nome, preco, descricao });
    return res.status(201).json(novoProduto);
  };

  update = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { nome, preco, descricao } = req.body;
    const atualizado = await this.service.update(id, { nome, preco, descricao });
    if (!atualizado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.json(atualizado);
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const deletado = await this.service.delete(id);
    if (!deletado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    return res.status(204).send();
  };
}
