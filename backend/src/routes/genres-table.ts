import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//! GET todos os gêneros
router.get("/genres", async (req, res) => {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: { name: "asc" }
        });
        res.json(genres);
    } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        res.status(500).json({ message: "Erro interno ao buscar gêneros" });
    }
});

//! POST para criar um novo gêneros
router.post("/genres", async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        res.status(400).json({ message: "Nome e cor são obrigatórios" });
    }

    try {
        const newGenre = await prisma.genre.create({
            data: { name, color }
        });
        res.status(201).json(newGenre);
    } catch (error) {
        console.error("Erro ao criar gênero:", error);
        res.status(500).json({ message: "Erro interno ao criar gênero" });
    }
});

//! DELETE para remover um gêneros
router.delete("/genres/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.genre.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({
                message: "Este gênero está vinculado a um ou mais jogos e não pode ser excluído."
            });
        }
    }
});

export default router;
