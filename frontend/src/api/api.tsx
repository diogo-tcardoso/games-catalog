const BASE_URL = "http://localhost:3000/api";

//! Define Game interface
export interface Game {
    id?: number;
    nome: string;
    console: string;
    genero: string;
    tipo: string;
    iniciado: Date;
    finalizado: Date;
    tempo: string;
    nota: number;
    dificuldade: string;
    zeramento: string;
}

//! Function to fetch data from the principal table
export const getPrincipalTable = async () => {
    try {
        const response = await fetch(`${BASE_URL}/principal-table`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching principal table:", error);
        throw error;
    }
};

//! Function to create a new entry in the principal table
export const addNewGame = async (gameData: Game): Promise<Game[]> => {
    try {
        const response = await fetch(`${BASE_URL}/principal-table`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) {
            throw new Error("Failed to create new game");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new game:", error);
        throw error;
    }
}