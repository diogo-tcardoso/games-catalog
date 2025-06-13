import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

//! Register controller
export const registerUser = async (req: Request, res: Response) => {
    console.log('Rota /api/register chamada com body:', req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
        return res.status(409).json({ error: 'Email is already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        },
        });

        return res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
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
            registeredUser.password
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