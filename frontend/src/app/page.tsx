import Image from "next/image";
import Header from "@/components/header/header";
import HeaderButtons from "@/components/header/buttons";

export default function Home() {
    return (
        <main className="font-sans">
            <Header>
                <HeaderButtons />
            </Header>
            <div className="flex flex-col h-35 justify-center mt-[-45px] text-center mb-35 items-center bg-gradient-to-br from-[#A1F9FF] to-[#135266]">
                <h1 className="text-5xl font-bold mb-2">Catalogue seus jogos zerados</h1>
                <p className="text-3xl text-[#135266] font-semibold">Tudo em um só lugar.</p>
            </div>
            <section className="flex flex-row items-center justify-center ml-2.5 mr-2.5 gap-15">
                <div>
                    <Image src="/photo1.webp" alt="Game Photo" width={650} height={650}/>
                </div>
                <div className="text-[#A1F9FF] flex flex-col justify-center items-center max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold mb-3">Crie sua própria lista</h2>
                    <div className="text-2xl mb-7 text-cyan-400">
                        <p className="mb-7">Escolha o sistema jogado, data de início, data de finalização, o gênero do jogo entre outros detalhes.</p>
                        <p className="text-cyan-200 mb-7">Personalize como quiser suas listas de sistemas, gênero e tipo dos jogos.</p>
                        <p className="">Veja como está o andamento de seu zeramento através do Dashboard. Nele você pode filtrar e visualizar de várias formas diferentes.</p>                        
                    </div>
                </div>
            </section>
        </main>
    );
}
