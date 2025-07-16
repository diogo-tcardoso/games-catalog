import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserById (req: Request, res: Response){
    const userId = parseInt(req.params.id);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                systems: true,
                genres: true,
                types: true
            }
        });

        if (!user) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

