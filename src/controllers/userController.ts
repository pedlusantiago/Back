import { Request, Response } from "express";
import userService from "../services/userService";

class UserController {
    async list(req: Request, res: Response) {
        const result = await userService.listUsers();
        res.json(result);
    }

    async get(req: Request, res: Response) {
        const id = Number(req.params.id);
        const result = await userService.getUser(id);
        res.json(result);
    }

    async create(req: Request, res: Response) {
        const { name, email, password, role } = req.body;
        const result = await userService.createUser(name, email, password, role);
        res.json(result);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { name, email, role } = req.body;
        const result = await userService.updateUser(id, name, email, role);
        res.json(result);
    }

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        const result = await userService.deleteUser(id);
        res.json(result);
    }

    async resetPassword(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { newPassword } = req.body;
        const result = await userService.resetPassword(id, newPassword);
        res.json(result);
    }
}

export default new UserController();
