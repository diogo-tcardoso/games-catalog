import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSystem = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { name, color } = req.body;

    try {
        const newSystem = await prisma.system.create({
        data: {
            name,
            color,
            userId
        }
        });
        res.status(201).json(newSystem);
    } catch (error) {
        console.error('Error creating system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    };

    export const getSystems = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    try {
        const systems = await prisma.system.findMany({ where: { userId } });
        res.json(systems);
    } catch (error) {
        console.error('Error fetching systems:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
