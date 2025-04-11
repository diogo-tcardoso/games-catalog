import Menu from "../../components/menu";
import Header from "./header";
import PrincipalTableData from "./principal-table-data";
import { Section, Aside } from "../../styles/home-styles/home-styles";


export default function Home() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <div>
                        <PrincipalTableData />
                    </div>
                </Section>
            </main>
        </>
    )
}