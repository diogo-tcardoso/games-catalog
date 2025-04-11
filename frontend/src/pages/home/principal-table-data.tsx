import { useState, useEffect } from "react";
import { getPrincipalTable, Game } from "../../api/api";
import GameList from "../../components/game-list";
import GameForm from "../../components/game-form";
import Modal from "../../components/modal";

export default function PrincipalTableData() {
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
                <GameList games={games} onAddClick={() => setIsModalOpen(true)} onDeleteComplete={fetchGames}/>
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