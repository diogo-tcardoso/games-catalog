export const BASE_URL = "http://localhost:3000/api";

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
        const response = await fetch(`${BASE_URL}/user/principal-table`);
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
        const response = await fetch(`${BASE_URL}/user/principal-table`, {
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
    const res = await fetch(`${BASE_URL}/user/principal-table/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete game");
    }
}

//! Define Genre interface
export interface Genre {
    id: number;
    name: string;
    color: string;
}

//! Function to fetch all genres
export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user/genres`);
        if (!response.ok) {
            throw new Error("Failed to fetch genres");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};

//! Function to create a new genre
export type NewGenre = Omit<Genre, 'id'>;
export const addGenres = async (genreData: NewGenre): Promise<Genre> => {
    try {
        const response = await fetch(`${BASE_URL}/user/genres`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(genreData),
        });
        if (!response.ok) {
            throw new Error("Failed to create new genre");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new genre:", error);
        throw error;
    }
};

//! Function to delete a genre
export const deleteGenres = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/genres/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete genre");
        }
    } catch (error) {
        console.error("Error deleting genre:", error);
        throw error;
    }
};

//! Function to put a genre entry
export const putGenre = async (genre: Genre): Promise<Genre> => {
    const response = await fetch(`${BASE_URL}/user/genres/${genre.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genre),
    });
    if (!response.ok) throw new Error("Failed to update genre");
    return await response.json();
};

//! Define System interface
export interface System {
    id: number;
    name: string;
    color: string;
}

//! Function to fetch all systems
export const getSystems = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user/systems`);
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
export const addSystem = async (systemData: NewSystem): Promise<System> => {
    try {
        const response = await fetch(`${BASE_URL}/user/systems`, {
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
        const response = await fetch(`${BASE_URL}/user/systems/${id}`, {
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

//! Define Type interface
export interface Type {
    id: number;
    name: string;
    color: string;
}

//! Function to fetch all types
export const getTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/user/types`);
        if (!response.ok) {
            throw new Error("Failed to fetch types");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching types:", error);
        throw error;
    }
};

//! Function to create a new type
export type NewType = Omit<Type, 'id'>;
export const addType = async (typeData: NewType): Promise<Type> => {
    try {
        const response = await fetch(`${BASE_URL}/user/types`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(typeData),
        });
        if (!response.ok) {
            throw new Error("Failed to create new type");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating new type:", error);
        throw error;
    }
};

//! Function to delete a type
export const deleteType = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/types/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete type");
        }
    } catch (error) {
        console.error("Error deleting type:", error);
        throw error;
    }
};