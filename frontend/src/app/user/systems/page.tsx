"use client"

import { useEffect, useState } from 'react';
import SystemsList from './system-list';
import SystemsData from './system-data';
import { System, getSystems, deleteSystem } from '@/lib/api/system-api';
import { Game, getPrincipalTable } from '@/lib/api/game-api';
import { useParams } from 'next/navigation';

export default function SystemsPage() {
    const [systems, setSystems] = useState<System[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const params = useParams();
    const userId = Number(params.userId);;

    useEffect(() => {
        const loadData = async () => {
            const [systemsData, gamesData] = await Promise.all([
                getSystems(userId),
                getPrincipalTable(userId)
            ]);
            setSystems(systemsData);
            setGames(gamesData);
        };

        if (userId) loadData();
    }, [userId]);

    const handleAdd = (newSystem: System) => {
        setSystems(prev => [...prev, newSystem]);
    };

    const handleDelete = async (id: number) => {
        await deleteSystem(id, userId);
        setSystems(prev => prev.filter(system => system.id !== id));
    };

    return (
        <div className='p-4 flex flex-col justify-center items-center'>
            <h2 className='text-gray-100 font-bold text-3xl'>
                Jogos Zerados e Tempo de Jogo por Sistema
            </h2>
            <SystemsList userId={Number(userId)} systems={systems} onAdd={handleAdd} />
            <SystemsData systems={systems} games={games} onDelete={handleDelete} />
        </div>
    );
}