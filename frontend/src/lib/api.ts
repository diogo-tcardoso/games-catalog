type RegisterResponse = {
    message: string;
    userId: string;
};

export async function registerUser(email: string, password: string): Promise<RegisterResponse> {
    const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Erro desconhecido ao registrar usuário.');
    }

    return data as RegisterResponse;
}