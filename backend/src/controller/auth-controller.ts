import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

//! Register controller
export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "Usuário já existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                hashedPassword: hashedPassword,
            },
        });

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: { id: newUser.id, email: newUser.email },
        });
    } catch (err) {
        console.error("Erro ao registrar:", err);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
};

//! Login Controller
export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const registeredUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!registeredUser) {
            res.status(400).json({ error: "Usuário não registrado" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            registeredUser.hashedPassword
        );

        if (!isPasswordValid) {
            res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: registeredUser.id, email: registeredUser.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login bem-sucedido",
            token,
            user: { id: registeredUser.id, email: registeredUser.email },
        });
    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ error: "Erro interno no servidor" });
    } 
};