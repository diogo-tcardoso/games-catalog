"use client"

import { Type, getTypes } from "@/lib/api/type-api";
import { Genre, getGenres } from "@/lib/api/genre-api";
import { System, getSystems } from "@/lib/api/system-api";
import { Game, getPrincipalTable } from "@/lib/api/game-api";
import { useState, useEffect, useCallback } from "react";
import GameList from "@/components/app-components/game-list";
import Modal from "@/components/app-components/modal";
import GameForm from "@/components/app-components/game-form";
import { useParams } from "next/navigation";

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([]);
    const [systems, setSystems] = useState<System[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ types, setTypes ] = useState<Type[]>([]);

    const params = useParams();
    const userId = Number(params.userId);
    
    const fetchGames = useCallback (async () => {
        const data = await getPrincipalTable(userId);
        setGames(data);
    }, [userId])

    const fetchSystems = useCallback(async () => {
        const data = await getSystems(userId);
        setSystems(data);
    }, [userId]);

    const fetchGenres = useCallback (async () => {
        const data = await getGenres(userId);
        setGenres(data);
    }, [userId]);

    const fetchTypes = useCallback (async () => {
        const data = await getTypes(userId);
        setTypes(data);
    }, [userId])

    useEffect(() => {
        fetchGames();
        fetchSystems();
        fetchGenres();
        fetchTypes();
    }, [fetchSystems, fetchGenres, fetchTypes, fetchGames]);    

    return (
        <>
            <div>
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
        </>
    );
}