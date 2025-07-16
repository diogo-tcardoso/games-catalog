import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

//! GET todos os tipos
router.get("/user/:userId/types", async (req, res) => {
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
router.post("/user/:userId/types", async (req, res) => {
    const { name, color } = req.body;

    if (!name || !color) {
        res.status(400).json({ message: "Nome e cor são obrigatórios" });
    }

    try {
        // Adapte a obtenção do userId conforme sua lógica de autenticação
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ message: "Usuário é obrigatório" });
        }
        const newType = await prisma.type.create({
            data: {
                name,
                color,
                user: {
                    connect: { id: userId }
                }
            }
        });
        res.status(201).json(newType);
    } catch (error) {
        console.error("Erro ao criar tipo:", error);
        res.status(500).json({ message: "Erro interno ao criar tipo" });
    }
});

//! DELETE para remover um tipo
router.delete("/user/:userId/types/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.type.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error: any) {
        if (error.code === 'P2003') {
            res.status(400).json({
                message: "Este tipo está vinculado a um ou mais jogos e não pode ser excluído."
            });
        }
    }
});

export default router;
