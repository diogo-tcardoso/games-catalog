import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";

export default function Stats() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <h1>Estatísticas</h1>
                        <p>Essa página é dedicada a estatísticas.</p>
                        <p>Em breve, mais informações.</p>
                    </Table>
                </Section>
            </main>
        </>
    )
}