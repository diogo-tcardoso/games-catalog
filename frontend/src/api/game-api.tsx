const BASE_URL = "http://localhost:3000/api";

//! Define Game interface
export interface Game {
    id?: number;
    nome: string;
    genreId: number;
    typeId: number;
    iniciado: Date;
    finalizado: Date;
    tempo: string;
    nota: number;
    dificuldade: string;
    zeramento: string;
    systemId: number;
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

//! Function to create a new game entry
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
};

//! Function to delete a game entry
export async function deleteGame(id: number) {
    const res = await fetch(`${BASE_URL}/principal-table/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete game");
    }
}