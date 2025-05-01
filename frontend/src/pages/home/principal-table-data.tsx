import { useState, useEffect } from "react";
import { getPrincipalTable, Game, getSystems, System } from "../../api/api";
import GameList from "../../components/games/game-list";
import GameForm from "../../components/games/game-form";
import Modal from "../../components/modal";

export default function PrincipalTableData() {
    const [games, setGames] = useState<Game[]>([]);
    const [systems, setSystems] = useState<System[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const fetchGames = async () => {
        const data = await getPrincipalTable();
        setGames(data);
    }

    const fetchSystems = async () => {
        const data = await getSystems();
        setSystems(data);
    }

    useEffect(() => {
        fetchGames();
        fetchSystems();
    }, []);

    return (
        <>
            <GameList games={games} systems={systems} onAddClick={() => setIsModalOpen(true)} onDeleteComplete={fetchGames}/>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <GameForm onCreate={() => {
                        fetchGames();
                        setIsModalOpen(false);
                    }} />
                </Modal>
            )}
        </>
    )
}