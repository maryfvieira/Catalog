// src/server.ts
import "reflect-metadata"; // Importe no topo!
import createApp from "./app";
import { registerDependencies } from "./container";

const PORT = 3000;

async function bootstrap() {
  // 1. Registra todas as dependências
  await registerDependencies();
  
  // 2. Cria o app Express
  const app = createApp();
  
  // 3. Inicia o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

bootstrap();