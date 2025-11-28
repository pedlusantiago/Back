import { Router } from "express";
import firebird from "../database/firebird";

const router = Router();

router.post("/usuarios", async (req, res) => {
  const { usuario, perfil } = req.body;

  if (!usuario || !perfil) {
    return res.status(400).json({
      error: "Informe USUARIO e PERFIL"
    });
  }

  try {
    const db = await firebird();

    // 1️⃣ Verificar se existe um registro válido em usucadastro
    const sqlBusca = `
            SELECT OPERADOR, USUARIO, PERFIL
            FROM USUCADASTRO
            WHERE USUARIO = ?
        `;

    const rows: any[] = await db.query(sqlBusca, [usuario]);

    if (rows.length === 0) {
      db.detach();
      return res.status(404).json({
        error: "Usuário não encontrado em USUCADASTRO"
      });
    }

    const operador = rows[0].OPERADOR;

    // 2️⃣ Criar usuário em USUDASH usando OPERADOR como ID
    const sqlInsert = `
            INSERT INTO USUDASH (ID, USUARIO, PERFIL)
            VALUES (?, ?, ?)
        `;

    await db.query(sqlInsert, [operador, usuario, perfil]);

    db.detach();

    return res.json({
      message: "Usuário cadastrado com sucesso",
      id: operador
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

export default router;
