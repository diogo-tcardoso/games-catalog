import { BASE_URL } from "./game-api";


//! Define Genre interface
export interface Register {
    id: number;
    email: string;
    hashedPassword: string;
}

//! Function to create a new genre
export type NewRegister = Omit<Register, 'id'>;
export const addGenres = async (registerData: NewRegister): Promise<Register> => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });
        if (!response.ok) {
            throw new Error("Failed to create new user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new user:", error);
        throw error;
    }
};