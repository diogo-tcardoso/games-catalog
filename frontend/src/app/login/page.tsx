"use client"

import Header from "@/components/page-component/header";
import HeaderButtons from "@/components/page-component/buttons";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/page-component/footer";
import { useUser } from "@/context/userContext";

type FormData = {
    email: string
    password: string
}

export default function LoginPage() {
    const { setUser } = useUser(); // ✅ useUser hook to set user context
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
            },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao fazer login");
            }

            const result = await response.json();
            setUser(result.user); // ✅ set user in context

            alert("Login realizado com sucesso!");
            router.push(`/user/${result.user.id}`); // ✅ redireciona corretamente

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Por favor, tente novamente.");
        }
    };

    return (
        <main className="font-sans">
            <Header>
                <HeaderButtons />
            </Header>
            <div className="flex flex-col h-35 justify-center mt-[-45px] text-center mb-35 items-center bg-gradient-to-br from-[#A1F9FF] to-[#135266]">
                <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Login</h1>
                <p className="text-lg text-[#135266] font-semibold">Por favor, faça login para continuar.</p>
            </div>
            <div className="flex items-center justify-center w-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col bg-cyan-200 items-center mt-8 text-cyan-800 border-2 border-cyan-800 w-96 h-90 justify-center rounded-3xl"
                >
                    <label className="mb-2">E-mail</label>
                    <input
                        {...register("email", {
                            required: "Campo Obrigatório",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "E-mail inválido",
                            },
                        })}
                        className="border-cyan-800 rounded-2xl border-2 mb-2 p-1 pl-3"
                        placeholder="example@email.com"
                    />
                    {errors.email && (
                        <span className="text-red-500 mb-4">{errors.email.message}</span>
                    )}

                    <label className="mb-2">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Campo Obrigatório",
                                minLength: {
                                    value: 8,
                                    message: "A senha deve ter pelo menos 8 caracteres",
                                },
                            })}
                            className="border-cyan-800 rounded-2xl border-2 p-1 pl-3 w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-4.5 transform -translate-y-1/2 text-cyan-800 hover:text-cyan-800 cursor-pointer"
                        >
                            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 mt-1 mb-4">{errors.password.message}</span>
                    )}

                    <button
                        type="submit"
                        className="bg-[#18E1F8] text-gray-900 rounded-2xl p-2 mt-4 hover:bg-cyan-500 border border-cyan-500 transition-colors duration-300 cursor-pointer w-30"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Enviar
                    </button>
                </form>
            </div>
            <Footer />
        </main>
    );
}
