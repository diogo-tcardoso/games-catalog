import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";
import GenrePage from "./genres-page";

export default function Genres() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <h1>Gêneros</h1>
                        <GenrePage />
                    </Table>
                </Section>
            </main>
        </>
    )
}