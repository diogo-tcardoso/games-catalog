import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";

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
                        <p>Essa página é dedicada a mostrar os tipos de jogos disponíveis no catálogo.</p>
                        <p>Você pode filtrar os jogos por gênero, plataforma e outros critérios.</p>
                        <p>Explore e descubra novos jogos para zerar!</p>
                    </Table>
                </Section>
            </main>
        </>
    )
}