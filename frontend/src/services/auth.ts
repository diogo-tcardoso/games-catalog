// services/auth.ts
import axios from 'axios'
import { BASE_URL } from '@/api/game-api';

type RegisterData = {
    email: string;
    password: string;
};

export const registerUser = async (data: RegisterData) => {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
};