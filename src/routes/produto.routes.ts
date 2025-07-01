import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import container from "../container";

const router = Router();
const controller = container.resolve(ProdutoController);

router.get("/produtos", controller.getAll.bind(controller));
router.get("/produtos/:id", controller.getById.bind(controller));
router.post("/produtos", controller.create.bind(controller));
router.put("/produtos/:id", controller.update.bind(controller));
router.delete("/produtos/:id", controller.delete.bind(controller));

export default router;
