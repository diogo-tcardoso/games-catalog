import Header from "@/components/header/header";
import MenuHeader from "@/components/header/menu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

    return (
        <main>
            <Header>
                <MenuHeader />
            </Header>
            <div className="flex justify-center items-center">
                {children}
            </div>
        </main>
    )
}