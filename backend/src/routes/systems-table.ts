import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//! GET todos os sistemas
router.get("user/:userId/systems", async (req, res) => {
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
router.post("user/:userId/systems", async (req, res) => {
    const { name, color, userId } = req.body;

    if (!name || !color) {
        res.status(400).json({ message: "Nome e cor são obrigatórios" });
    }

    try {
        const newSystem = await prisma.system.create({
            data: { name, color, userId }
        });
        res.status(201).json(newSystem);
    } catch (error) {
        console.error("Erro ao criar sistema:", error);
        res.status(500).json({ message: "Erro interno ao criar sistema" });
    }
});

//! DELETE para remover um sistema
router.delete("user/systems/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.system.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({
                message: "Este sistema está vinculado a um ou mais jogos e não pode ser excluído."
            });
        }
    }
});

export default router;
