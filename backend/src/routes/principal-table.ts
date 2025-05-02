import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/principal-table", async (req, res) => {
    try {
        const principalTable = await prisma.principal.findMany({
            include: {
                system: true,
                genre: true,
            },
        });
        res.json(principalTable);
    } catch (error) {
        console.error("Error fetching principal table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/principal-table", async (req, res) => {
    const { nome, genreId, typeId, iniciado, finalizado, tempo, nota, dificuldade, zeramento, systemId } = req.body;

    if (systemId <= 0 || genreId <= 0 || !nome || typeId <= 0 || !iniciado || !finalizado || !tempo || nota === undefined || !dificuldade || !zeramento) {
        res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const existingSystem = await prisma.system.findUnique({ where: { id: systemId } });
        if (!existingSystem) {
            res.status(404).json({ message: "Sistema não encontrado." });
        }

        const existingGenre = await prisma.genre.findUnique({ where: { id: genreId } });
        if (!existingGenre) {
            res.status(404).json({ message: "Gênero não encontrado." });
        }

        const newPrincipal = await prisma.principal.create({
            data: {
                nome,
                type: { connect: { id: typeId } },
                iniciado: new Date(iniciado),
                finalizado: new Date(finalizado),
                tempo,
                nota,
                dificuldade,
                zeramento,
                genre: { connect: { id: genreId } },
                system: { connect: { id: systemId } },
            },
        });

        res.status(201).json(newPrincipal);
    } catch (error) {
        console.error("Error creating principal:", error);
        res.status(500).json({ message: "Erro interno ao criar o jogo." });
    }
});


router.delete("/principal-table/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.principal.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(204).json({ message: "Principal deleted successfully" });
    } catch (error) {
        console.error("Error deleting principal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;