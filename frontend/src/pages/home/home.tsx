import Menu from "../../components/menu";
import Header from "./header";
import PrincipalTableData from "./principal-table-data";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";


export default function Home() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <PrincipalTableData />
                    </Table>
                </Section>
            </main>
        </>
    )
}