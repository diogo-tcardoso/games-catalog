import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";

export default function Series() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <h1>Séries</h1>
                        <p>Esta página está em construção.</p>
                    </Table>
                </Section>
            </main>
        </>
    )
}