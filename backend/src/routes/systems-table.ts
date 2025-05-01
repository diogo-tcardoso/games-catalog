import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//! GET todos os sistemas
router.get("/systems", async (req, res) => {
    try {
        const systems = await prisma.system.findMany({
            orderBy: { name: "asc" }
        });
        res.json(systems);
    } catch (error) {
        console.error("Erro ao buscar sistemas:", error);
        res.status(500).json({ message: "Erro interno ao buscar sistemas" });
    }
});

//! POST para criar um novo sistema
router.post("/systems", async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        res.status(400).json({ message: "Nome e cor são obrigatórios" });
    }

    try {
        const newSystem = await prisma.system.create({
            data: { name, color }
        });
        res.status(201).json(newSystem);
    } catch (error) {
        console.error("Erro ao criar sistema:", error);
        res.status(500).json({ message: "Erro interno ao criar sistema" });
    }
});

//! DELETE para remover um sistema
router.delete("/systems/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.system.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Erro ao deletar sistema:", error);
        res.status(500).json({ message: "Erro interno ao deletar sistema" });
    }
});

export default router;
