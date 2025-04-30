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
    systemId: number; // Relacionamento com o sistema
}

//! Define System interface
export interface System {
    id: number;
    name: string;
    color: string;
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

//! Function to fetch all systems
export const getSystems = async () => {
    try {
        const response = await fetch(`${BASE_URL}/systems`);
        if (!response.ok) {
            throw new Error("Failed to fetch systems");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching systems:", error);
        throw error;
    }
};

//! Function to create a new system
export type NewSystem = Omit<System, 'id'>;
export const addSystem = async (systemData: NewSystem): Promise<System[]> => {
    try {
        const response = await fetch(`${BASE_URL}/systems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(systemData),
        });
        if (!response.ok) {
            throw new Error("Failed to create new system");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new system:", error);
        throw error;
    }
};

//! Function to delete a system
export const deleteSystem = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/systems/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete system");
        }
    } catch (error) {
        console.error("Error deleting system:", error);
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
