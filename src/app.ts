// src/app.ts
import express from "express";
import produtoRoutes from "./routes/produto.routes";

export default function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/api", produtoRoutes);
  return app;
}