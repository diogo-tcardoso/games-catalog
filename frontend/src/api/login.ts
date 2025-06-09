import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../../../backend/src/routes/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        if (req.method === "POST") {
            const { email, password } = req.body;
        
            try {
            const user = await getUserByEmail(email);
        
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }
        
            // Here you would typically create a session or JWT token
            return res.status(200).json({ message: "Login successful", user });
            } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Internal server error" });
            }
        } else {
            res.setHeader("Allow", ["POST"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
