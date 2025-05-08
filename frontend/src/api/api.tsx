const BASE_URL = "http://localhost:3000/api";

//! Define Genre interface
export interface Genre {
    id: number;
    name: string;
    color: string;
}

//! Define Type interface
export interface Type {
    id: number;
    name: string;
    color: string;
}

//! Function to fetch all genres
export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_URL}/genres`);
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
        const response = await fetch(`${BASE_URL}/genres`, {
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
        const response = await fetch(`${BASE_URL}/genres/${id}`, {
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
    const response = await fetch(`${BASE_URL}/genres/${genre.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genre),
    });
    if (!response.ok) throw new Error("Failed to update genre");
    return await response.json();
};

//! Function to fetch all types
export const getTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/types`);
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
        const response = await fetch(`${BASE_URL}/types`, {
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
        const response = await fetch(`${BASE_URL}/types/${id}`, {
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