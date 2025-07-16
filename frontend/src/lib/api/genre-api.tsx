import { BASE_URL } from "./game-api";


//! Define Genre interface
export interface Genre {
    id: number;
    name: string;
    color: string;
    userId: number;
}

//! Function to fetch all genres
export const getGenres = async (userId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/genres`);
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
export type NewGenre = Omit<Genre, 'id' | 'userId'>;
export const addGenres = async (userId: number, genreData: NewGenre): Promise<Genre> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/genres`, {
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
export const deleteGenres = async (userId: number, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/genres/${id}`, {
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
export const putGenre = async (userId: number, genre: Genre): Promise<Genre> => {
    const response = await fetch(`${BASE_URL}/user/${userId}/genres/${genre.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genre),
    });
    if (!response.ok) throw new Error("Failed to update genre");
    return await response.json();
};