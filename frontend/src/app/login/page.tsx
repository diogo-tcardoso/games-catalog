"use client"

import Header from "@/components/header/header";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
type FormData = {
    email: string
    password: string
}

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: FormData) => {
        // Aqui você pode validar credenciais reais, se quiser
        console.log(data);
        router.push("/user");
    };

    return (
        <main className="font-sans">
            <Header />
            <div className="flex flex-col h-35 justify-center mt-[-45px] text-center mb-35 items-center bg-gradient-to-br from-[#A1F9FF] to-[#135266]">
                <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Login</h1>
                <p className="text-lg text-[#135266] font-semibold">Por favor, faça login para continuar.</p>
            </div>
            <div className="flex items-center justify-center w-screen">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col bg-cyan-200 items-center mt-8 text-cyan-800 border-2 border-cyan-800 w-96 h-90 justify-center rounded-4xl"
                >
                    <label className="mb-2">E-mail</label>
                    <input
                        {...register("email", { required: true })}
                        className="border-cyan-800 rounded-2xl border-2 mb-2 p-1 pl-3"
                        placeholder="example@email.com"
                    />
                    {errors.email && (
                        <span className="text-red-500 mb-4">Campo obrigatório</span>
                    )}

                    <label className="mb-2">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
                            className="border-cyan-800 rounded-2xl border-2 p-1 pl-3 w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-4 transform -translate-y-1/2 text-cyan-800 hover:text-cyan-800 cursor-pointer"
                        >
                            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 mt-1 mb-4">Campo obrigatório</span>
                    )}

                    <button
                        type="submit"
                        className="bg-[#18E1F8] text-gray-900 rounded-2xl p-2 mt-4 hover:bg-cyan-500 border border-cyan-500 transition-colors duration-300 cursor-pointer w-30"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </main>
    );
}
