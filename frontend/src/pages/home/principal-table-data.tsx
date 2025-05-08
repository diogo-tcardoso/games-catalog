import { useState, useEffect } from "react";
import { Genre, getGenres } from "../../api/api";
import { getSystems, System } from "../../api/system-api";
import { Game, getPrincipalTable } from "../../api/game-api";
import GameList from "../../components/games/game-list";
import GameForm from "../../components/games/game-form";
import Modal from "../../components/modal";

export default function PrincipalTableData() {
    const [games, setGames] = useState<Game[]>([]);
    const [systems, setSystems] = useState<System[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const fetchGames = async () => {
        const data = await getPrincipalTable();
        setGames(data);
    }

    const fetchSystems = async () => {
        const data = await getSystems();
        setSystems(data);
    }

    const fetchGenres = async () => {
        const data = await getGenres();
        setGenres(data);
    }

    useEffect(() => {
        fetchGames();
        fetchSystems();
        fetchGenres();
    }, []);

    return (
        <>
            <GameList games={games} systems={systems} genres={genres} onAddClick={() => setIsModalOpen(true)} onDeleteComplete={fetchGames}/>
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