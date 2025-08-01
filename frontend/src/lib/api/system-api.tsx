import { BASE_URL } from "./game-api";

//! Define System interface
export interface System {
    id: number;
    name: string;
    color: string;
    userId: number;
}

//! Function to fetch all systems
export const getSystems = async (userId: number): Promise<System[]> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/systems`);
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
export type NewSystem = Omit<System, 'id' | 'userId'>;
export const addSystem = async (userId: number, systemData: NewSystem): Promise<System> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/systems`, {
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
export const deleteSystem = async (userId:number, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/systems/${id}`, {
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