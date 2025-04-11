import { Link, MenuTitle, MenuPages } from "../styles/menu-styles"

export default function Menu(){
    return(
        <>
            <nav>
                <MenuTitle>Menu</MenuTitle>
                <ul>
                    <MenuPages><Link href="/">Home</Link></MenuPages>
                    <MenuPages><Link href="/systems">Sistemas</Link></MenuPages>
                    <MenuPages><Link href="/genres">Gêneros</Link></MenuPages>
                    <MenuPages><Link href="/types">Tipos</Link></MenuPages>
                    <MenuPages><Link href="/series">Séries</Link></MenuPages>
                    <MenuPages><Link href="/stats">Estatísticas</Link></MenuPages>
                </ul>
            </nav>
        </>
    )
}