import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";

const router = Router();
const controller = new ProdutoController();

router.get("/produtos", (req, res) => controller.getAll(req, res));
router.get("/produtos/:id", (req, res) => controller.getById(req, res));
router.post("/produtos", (req, res) => controller.create(req, res));
router.put("/produtos/:id", (req, res) => controller.update(req, res));
router.delete("/produtos/:id", (req, res) => controller.delete(req, res));

export default router;
