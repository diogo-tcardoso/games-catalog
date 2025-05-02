import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";
import TypePage from "./types-page";

export default function Types(){
    return(
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <h1>Tipos de Jogos</h1>
                        <TypePage />
                    </Table>
                </Section>
            </main>
        </>
    )
}