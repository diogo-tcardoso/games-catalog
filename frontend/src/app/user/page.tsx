"use client"

import { Type, getTypes } from "@/lib/api/type-api";
import { Genre, getGenres } from "@/lib/api/genre-api";
import { System, getSystems } from "@/lib/api/system-api";
import { Game, getPrincipalTable } from "@/lib/api/game-api";
import { useState, useEffect } from "react";
import GameList from "@/components/app-components/game-list";
import Modal from "@/components/app-components/modal";
import GameForm from "@/components/app-components/game-form";

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([]);
    const [systems, setSystems] = useState<System[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ types, setTypes ] = useState<Type[]>([]);
    
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

    const fetchTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    }

    useEffect(() => {
        fetchGames();
        fetchSystems();
        fetchGenres();
        fetchTypes();
    }, []);    

    return (
        <main>
            <div className="flex flex-col items-center justify-center h-screen">
                <GameList games={games} systems={systems} genres={genres}types={types} onAddClick={() => setIsModalOpen(true)} onDeleteComplete={fetchGames}/>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <GameForm onCreate={() => {
                            fetchGames();
                            setIsModalOpen(false);
                        }}/>
                    </Modal>
                )}
            </div>
        </main>
    );
}