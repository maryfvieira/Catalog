import "reflect-metadata"; 
import { ProdutoController } from "../src/controllers/produto.controller";
import { ProdutoService } from "../src/services/produto.service";
import { Request, Response } from "express";
import { Produto } from "../src/interfaces/produto.interface";
import { ProdutoRepository } from "../src/repositories/produto.repository";
import { connectToMongo, stopInMemoryMongo } from "../src/database/connectToMongo";

describe("ProdutoController", () => {
    let controller: ProdutoController;
    let mockResponse: Response;
  
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnThis();
    const sendMock = jest.fn();
    let produto = {} as Produto;
  
    beforeAll(async () => {
      // Conecta usando a estratégia correta automaticamente
      const db = await connectToMongo();
      
      // Inicializa dependências
      const repository = new ProdutoRepository(db);
      const service = new ProdutoService(repository);
      controller = new ProdutoController(service);
      
      
      mockResponse = {
        json: jsonMock,
        status: statusMock,
        send: sendMock,
      } as unknown as Response;
    });

    afterAll(async () => {
    await stopInMemoryMongo();
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    //tests using the real database connection
    it("should log environment variables", () => {
      console.log("NODE_ENV:", process.env.NODE_ENV);
      console.log("CI:", process.env.CI);
      console.log("DB_USER:", process.env.MONGODB_USERNAME);
      expect(true).toBe(true);
    });

    it("deve retornar 404 ao tentar deletar produto inexistente", async () => {
      const nonExistingId = 9999;
      const req = {
        params: { id: nonExistingId.toString() },
      } as unknown as Request<{ id: string }>;
    
      await controller.delete(req, mockResponse);
    
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    });

    it("deve criar e retornar um produto", async () => {
      const req = {
        body: { nome: "Produto Teste", preco: 100, descricao: "Descrição" }
      } as Request;
      
      await controller.create(req, mockResponse);
      produto = jsonMock.mock.calls[0][0] as Produto;
      
      expect(statusMock).toHaveBeenCalledWith(201);

      expect(produto.nome).toBe("Produto Teste");
      expect(produto.preco).toBe(100);
    });
    
    it("deve retornar um produto existente por ID", async () => {
      
      // Criar requisição
      const req = {
        params: { id: produto.id.toString() },
      } as unknown as Request<{ id: string }>;
  
      // Executar
      await controller.getById(req, mockResponse);
  
      // Verificar
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco
        })
      );
    });
  
    //Mock with jest.fn() to simulate the response object
    // it("deve atualizar um produto existente", async () => {
    //   const atualizado = { id: produto.id, nome: "Atualizado", preco: 200 };
    //   const req = {
    //     params: { id: produto.id.toString() },
    //     body: { nome: "Atualizado", preco: 200 },
    //   } as unknown as Request<{ id: string }>;
  
    //   // Executar
    //   await controller.update(req, mockResponse);
    //   produto = jsonMock.mock.calls[0][0] as Produto;
  
    //    // Verificar
    //    expect(jsonMock).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       id: produto.id,
    //       nome: atualizado.nome,
    //       preco: atualizado.preco
    //     })
    //   );
    // });
    // it("deve retornar 404 ao tentar atualizar produto inexistente", async () => {
    //   const nonExistingId = 9999;
    //   const req = {
    //     params: { id: nonExistingId.toString() },
    //     body: { nome: "Não existe", preco: 50 },
    //   } as unknown as Request<{ id: string }>;
    
    //   await controller.update(req, mockResponse);
    
    //   expect(statusMock).toHaveBeenCalledWith(404);
    //   expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    // });
  
    // it("deve deletar um produto existente", async() => {
    //   const deleteReq = {
    //     params: { id: produto.id.toString() },
    //   } as unknown as Request<{ id: string }>;
    
    //   await controller.delete(deleteReq, mockResponse);
    
    //   // 3. Verificar resposta de deleção
    //   expect(statusMock).toHaveBeenCalledWith(204);
    //   expect(sendMock).toHaveBeenCalled();
    // });
  
    // it("deve retornar 404 ao tentar deletar produto inexistente", () => {
    //   const req = {
    //     params: { id: produto.id.toString() },
    //   } as unknown as Request<{ id: string }>;
  
    //   controller.delete(req, mockResponse);
  
    //   expect(statusMock).toHaveBeenCalledWith(404);
    //   expect(jsonMock).toHaveBeenCalledWith({ mensagem: "Produto não encontrado" });
    // });
   });
  
