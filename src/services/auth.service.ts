import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import firebird from "../database/firebird";

export class AuthService {

    async login(username: string, password: string) {

        const sql = `
            SELECT ID, USERNAME, PASSWORD, ROLE 
            FROM USERS 
            WHERE USERNAME = ?
        `;

        // 🔥 Abre a conexão
        const db = await firebird();

        // 🔥 Executa a query pelo método retornado
        const result = await db.query(sql, [username]);

        // 🔥 Fecha conexão
        db.detach();

        if (!result || result.length === 0)
            throw new Error("Usuário não encontrado");

        const user = result[0];

        const valid = await bcrypt.compare(password, user.PASSWORD);
        if (!valid)
            throw new Error("Senha inválida");

        const token = jwt.sign(
            { id: user.ID, role: user.ROLE },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        const refresh = jwt.sign(
            { id: user.ID },
            process.env.REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        return { token, refresh, user };
    }
}
