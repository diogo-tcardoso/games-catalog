import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/principal-table", async (req, res) => {
    try {
        const principalTable = await prisma.principal.findMany();
        res.json(principalTable);
    } catch (error) {
        console.error("Error fetching principal table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/principal-table", async (req, res) => {
    const { nome, console, genero, tipo, iniciado, finalizado, tempo, nota, dificuldade, zeramento } = req.body;

    try {
        const newPrincipal = await prisma.principal.create({
            data: {
                nome,
                console,
                genero,
                tipo,
                iniciado: new Date(iniciado),
                finalizado: new Date(finalizado),
                tempo,
                nota,
                dificuldade,
                zeramento,
            },
        });
        res.status(201).json(newPrincipal);
    } catch (error) {
        console.error("Error creating principal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
