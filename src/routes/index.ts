import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import { role } from "../middlewares/roles";

const router = Router();
const authController = new AuthController();

// Rotas de login
router.post("/login", (req, res) => authController.login(req, res));

// Teste de rota protegida
router.get("/admin-only", auth, role("admin"), (req, res) => {
    res.json({ message: "Acesso liberado para admin!" });
});

export default router;
