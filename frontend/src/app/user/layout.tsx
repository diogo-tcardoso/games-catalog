import Header from "@/components/header/header";
import MenuHeader from "@/components/header/menu";
import { UserProvider } from "@/context/userContext";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

    return (
        <main>
            <Header>
                <MenuHeader />
            </Header>
            <UserProvider>
                <div className="flex justify-center items-center">
                    {children}
                </div>
            </UserProvider>
        </main>
    )
}