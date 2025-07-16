import Header from "@/components/page-component/header";
import MenuHeader from "@/components/page-component/menu";
import { UserProvider } from "@/context/userContext";
import Footer from "@/components/page-component/footer";

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
            <Footer />
        </main>
    )
}