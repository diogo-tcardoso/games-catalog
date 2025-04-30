import Menu from "../../components/menu";
import Header from "../home/header";
import { Section, Aside, Table } from "../../styles/home-styles/home-styles";
import SystemsPage from "./systems-page";

export default function Systems() {
    return (
        <>
            <main>
                <Header />
                <Section>
                    <Aside>
                        <Menu />
                    </Aside>
                    <Table>
                        <h1>Systems</h1>
                        <SystemsPage />
                    </Table>
                </Section>
            </main>

        </>
    )
}