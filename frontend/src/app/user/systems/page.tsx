import { useEffect, useState } from 'react';
import SystemsList from './system-list';
import SystemsData from './system-data';
import { System, getSystems, deleteSystem } from '@/lib/api/system-api';
import { Game, getPrincipalTable } from '@/lib/api/game-api';

export default function SystemsPage() {
    const [systems, setSystems] = useState<System[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [systemsData, gamesData] = await Promise.all([
                getSystems(),
                getPrincipalTable()
            ]);
            setSystems(systemsData);
            setGames(gamesData);
        };

        loadData();
    }, []);

    const handleAdd = (newSystem: System) => {
        setSystems(prev => [...prev, newSystem]);
    };

    const handleDelete = async (id: number) => {
        await deleteSystem(id);
        setSystems(prev => prev.filter(system => system.id !== id));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '2rem' }}>
                Jogos Zerados e Tempo de Jogo por Sistema
            </h2>
            <SystemsList systems={systems} onAdd={handleAdd} />
            <SystemsData systems={systems} games={games} onDelete={handleDelete} />
        </div>
    );
}