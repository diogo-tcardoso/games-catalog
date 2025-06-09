import Header from "@/components/header/header"
import HeaderButtons from "@/components/header/buttons"

export default function RegisterPage (){

    return (
        <main>
            <Header>
                <HeaderButtons />
            </Header>
            <div className="flex flex-col h-35 justify-center mt-[-45px] text-center mb-35 items-center bg-gradient-to-br from-[#A1F9FF] to-[#135266]">
                <h1 className="text-4xl font-bold mb-4">Registre-se</h1>
                <p className="text-lg text-[#135266] font-semibold">Por favor, faça seu registro para criar seu catálogo.</p>
            </div>
        </main>
    )
}