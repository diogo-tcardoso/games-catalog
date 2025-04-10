import Menu from "../../components/menu";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import GameForm from "../../components/game-form";
import GameList from "../../components/game-list";
import { Game, getPrincipalTable } from "../../api/api";
import Modal from "../../components/modal";


export default function Home() {
    const [games, setGames] = useState<Game[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div>
                    <GameList games={games} onAddClick={() => setIsModalOpen(true)} onDeleteComplete={fetchGames}/>
                    {isModalOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                            <GameForm onCreate={() => {
                                fetchGames();
                                setIsModalOpen(false);
                            }} />
                        </Modal>
                    )}
                </div>
            </div>
        </>
    )
}