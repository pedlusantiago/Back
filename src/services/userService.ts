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
    return db.query("SELECT ID, NAME, EMAIL, ROLE FROM USERS");
  }

  async getUser(id: number) {
    const db = await firebird();
    const result = await db.query("SELECT ID, NAME, EMAIL, ROLE FROM USERS WHERE ID=?", [id]);
    return result[0];
  }

  async createUser(name: string, email: string, password: string, role: string) {
    const db = await firebird();
    const hashed = await hashPassword(password);

    await db.query(
      "INSERT INTO USERS (NAME, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role]
    );

    return { message: "Usuário criado com sucesso." };
  }

  async updateUser(id: number, name: string, email: string, role: string) {
    const db = await firebird();
    await db.query(
      "UPDATE USERS SET NAME=?, EMAIL=?, ROLE=? WHERE ID=?",
      [name, email, role, id]
    );
    return { message: "Usuário atualizado." };
  }

  async deleteUser(id: number) {
    const db = await firebird();
    await db.query("DELETE FROM USERS WHERE ID=?", [id]);
    return { message: "Usuário deletado." };
  }

  async resetPassword(id: number, newPassword: string) {
    const db = await firebird();
    const hashed = await hashPassword(newPassword);

    await db.query("UPDATE USERS SET PASSWORD=? WHERE ID=?", [hashed, id]);

    return { message: "Senha resetada com sucesso." };
  }
}

export default new UserService();
