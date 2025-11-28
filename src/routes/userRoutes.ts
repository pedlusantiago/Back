import { Router } from "express";
import userController from "../controllers/userController";
// import { adminOnly } from "../middlewares/admin";  // ⛔ desativado temporariamente

const router = Router();

// 🔓 ROTAS LIVRES PARA TESTE
router.get("/", userController.list);
router.get("/:id", userController.get);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);
router.put("/:id/reset-password", userController.resetPassword);

export default router;
