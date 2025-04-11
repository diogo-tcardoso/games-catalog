import { Link, MenuTitle } from "../styles/menu-styles"

export default function Menu(){
    return(
        <>
            <nav>
                <MenuTitle>Menu</MenuTitle>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/systems">Sistemas</Link></li>
                    <li><Link href="/genres">Gêneros</Link></li>
                    <li><Link href="/types">Tipos</Link></li>
                    <li><Link href="/series">Séries</Link></li>
                    <li><Link href="/stats">Estatísticas</Link></li>
                </ul>
            </nav>
        </>
    )
}