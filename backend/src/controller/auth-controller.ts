import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

//! Register controller
export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Preencha todos os campos.' })
    }

    try {
        const userExists = await prisma.user.findUnique({ where: { email } })

        if (userExists) {
            res.status(409).json({ message: 'E-mail já cadastrado.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { email, hashedPassword },
        })

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: { id: user.id, email: user.email, password:hashedPassword },
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro interno', error })
    }
}

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