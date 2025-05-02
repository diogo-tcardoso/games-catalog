import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//! GET todos os tipos
router.get("/types", async (req, res) => {
    try {
        const types = await prisma.type.findMany({
            orderBy: { name: "asc" }
        });
        res.json(types);
    } catch (error) {
        console.error("Erro ao buscar tipo:", error);
        res.status(500).json({ message: "Erro interno ao buscar tipo" });
    }
});

//! POST para criar um novo tipo
router.post("/types", async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        res.status(400).json({ message: "Nome e cor são obrigatórios" });
    }

    try {
        const newType = await prisma.type.create({
            data: { name, color }
        });
        res.status(201).json(newType);
    } catch (error) {
        console.error("Erro ao criar tipo:", error);
        res.status(500).json({ message: "Erro interno ao criar tipo" });
    }
});

//! DELETE para remover um tipo
router.delete("/types/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.type.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Erro ao deletar tipo:", error);
        res.status(500).json({ message: "Erro interno ao deletar tipo" });
    }
});

export default router;
