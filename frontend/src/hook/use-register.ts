import { useState } from 'react';
import { registerUser } from '@/lib/api';

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await registerUser(email, password);
            setSuccess(true);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
            } else {
                setError('Erro inesperado.');
            }
            } finally {
                setLoading(false);
            }
        };

    return { handleRegister, loading, error, success };
}

