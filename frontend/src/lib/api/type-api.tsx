const BASE_URL = "http://localhost:3000/api";

//! Define Type interface
export interface Type {
    id: number;
    name: string;
    color: string;
    userId: number;
}

//! Function to fetch all types
export const getTypes = async (userId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/types`);
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
export type NewType = Omit<Type, 'id' | 'userId'>;
export const addType = async (userId: number, typeData: NewType): Promise<Type> => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/types`, {
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
export const deleteType = async (userId: number, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/types/${id}`, {
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