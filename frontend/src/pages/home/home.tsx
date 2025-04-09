import Menu from "../../components/menu";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import GameForm from "../../components/game-form";
import GameList from "../../components/game-list";
import { Game, getPrincipalTable } from "../../api/api";


export default function Home() {
    const [games, setGames] = useState<Game[]>([]);
    const fetchGames = async () => {
        const data = await getPrincipalTable();
        setGames(data);
    }
    useEffect(() => {
        fetchGames();
    }, []);
    return (
        <>
            <Header />
            <Menu />
            <div>
                <h1 className="text-2xl font-bold text-center">Jogos Finalizados</h1>
                <GameForm onCreate={fetchGames} />
                <div className="overflow-x-auto">
                    <GameList games={games} />
                </div>
            </div>
        </>
    )
}