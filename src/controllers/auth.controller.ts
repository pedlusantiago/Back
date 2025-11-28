import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const data = await service.login(username, password);
            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}
