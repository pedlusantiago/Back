
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 ROTA DE TESTE (SEM AUTH)
app.get('/teste', (req, res) => {
    res.json({ message: 'Servidor funcionando!' });
});

// Rotas reais
app.use("/users", userRoutes);

// Página inicial
app.get('/', (req, res) => {
    res.json({ message: 'API Online' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
