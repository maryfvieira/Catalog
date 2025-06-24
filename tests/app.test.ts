import { ProdutoController } from "../src/controllers/produto.controller";
import { ProdutoService } from "../src/services/produto.service";
import { Request, Response } from "express";
import { Produto } from "../src/interfaces/produto.interface";

jest.mock("../src/services/produto.service");

describe("ProdutoController", () => {
    let controller: ProdutoController;
    let mockResponse: Response;
  
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnThis();
    const sendMock = jest.fn();
  
    beforeEach(() => {
      controller = new ProdutoController();
  
      mockResponse = {
        json: jsonMock,
        status: statusMock,
        send: sendMock,
      } as unknown as Response;
  
      jest.clearAllMocks();
    });
  
    it("deve retornar todos os produtos", () => {
      const produtos: Produto[] = [{ id: 1, nome: "Produto A", preco: 100 }];
      jest.spyOn(ProdutoService.prototype, "getAll").mockReturnValue(produtos);
  
      const req = {} as Request;
  
      controller.getAll(req, mockResponse);
  
      expect(jsonMock).toHaveBeenCalledWith(produtos);
    });
  
    it("deve retornar um produto existente por ID", () => {
      const produto = { id: 1, nome: "Produto A", preco: 100 };
      const req = {
        params: { id: "1" },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "getById").mockReturnValue(produto);
  
      controller.getById(req, mockResponse);
  
      expect(jsonMock).toHaveBeenCalledWith(produto);
    });
  
    it("deve retornar 404 se produto não for encontrado por ID", () => {
      const req = {
        params: { id: "99" },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "getById").mockReturnValue(undefined);
  
      controller.getById(req, mockResponse);
  
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    });
  
    it("deve criar um novo produto", () => {
      const body = { nome: "Novo Produto", preco: 150, descricao: "desc" };
      const criado = { id: 1, ...body };
  
      const req = {
        body,
      } as Request;
  
      jest.spyOn(ProdutoService.prototype, "create").mockReturnValue(criado);
  
      controller.create(req, mockResponse);
  
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(criado);
    });
  
    it("deve atualizar um produto existente", () => {
      const atualizado = { id: 1, nome: "Atualizado", preco: 200 };
      const req = {
        params: { id: "1" },
        body: { nome: "Atualizado", preco: 200 },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "update").mockReturnValue(atualizado);
  
      controller.update(req, mockResponse);
  
      expect(jsonMock).toHaveBeenCalledWith(atualizado);
    });
  
    it("deve retornar 404 ao tentar atualizar produto inexistente", () => {
      const req = {
        params: { id: "99" },
        body: { nome: "Não existe", preco: 50 },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "update").mockReturnValue(null);
  
      controller.update(req, mockResponse);
  
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    });
  
    it("deve deletar um produto existente", () => {
      const req = {
        params: { id: "1" },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "delete").mockReturnValue(true);
  
      controller.delete(req, mockResponse);
  
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  
    it("deve retornar 404 ao tentar deletar produto inexistente", () => {
      const req = {
        params: { id: "99" },
      } as unknown as Request<{ id: string }>;
  
      jest.spyOn(ProdutoService.prototype, "delete").mockReturnValue(false);
  
      controller.delete(req, mockResponse);
  
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    });
  });
  
