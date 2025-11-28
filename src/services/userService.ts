import { hashPassword } from "../utils/hash";
import firebird from "../database/firebird";

export interface User {
  ID: number;
  NAME: string;
  EMAIL: string;
  PASSWORD: string;
  ROLE: "admin" | "user";
}

class UserService {
  async listUsers() {
    const db = await firebird();
    return db.query("SELECT USUARIO, PERFIL FROM USUCADASTRO");
  }

  async getUser(id: number) {
    const db = await firebird();
    const result = await db.query("SELECT USUARIO, PERFIL FROM USUCADASTRO WHERE OPERADOR=?", [id]);
    return result[0];
  }

  async resetPassword(id: number, newPassword: string) {
    const db = await firebird();
    const hashed = await hashPassword(newPassword);

    await db.query("UPDATE USERS SET PASSWORD=? WHERE ID=?", [hashed, id]);

    return { message: "Senha resetada com sucesso." };
  }
}

export default new UserService();
