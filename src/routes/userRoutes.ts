import { Router } from "express";
import userController from "../controllers/userController";
import { adminOnly } from "../middlewares/admin";

const router = Router();

router.get("/", adminOnly, userController.list);
router.get("/:id", adminOnly, userController.get);
router.post("/", adminOnly, userController.create);
router.put("/:id", adminOnly, userController.update);
router.delete("/:id", adminOnly, userController.remove);
router.put("/:id/reset-password", adminOnly, userController.resetPassword);

export default router;
