import { MenuTitle, MenuPages, Link } from "../styles/menu-styles"

export default function Menu(){
    return(
        <>
            <nav>
                <MenuTitle>Menu</MenuTitle>
                <ul>
                    <MenuPages><Link to="/">Home</Link></MenuPages>
                    <MenuPages><Link to="/systems">Sistemas</Link></MenuPages>
                    <MenuPages><Link to="/genres">Gêneros</Link></MenuPages>
                    <MenuPages><Link to="/types">Tipos</Link></MenuPages>
                    <MenuPages><Link to="/series">Séries</Link></MenuPages>
                    <MenuPages><Link to="/stats">Estatísticas</Link></MenuPages>
                </ul>
            </nav>
        </>
    )
}