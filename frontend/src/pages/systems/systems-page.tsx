import { useEffect, useState } from 'react';
import SystemsList from '../../components/systems/systems-list';
import SystemsData from './systems-data';
import { getSystems, getPrincipalTable, deleteSystem } from '../../api/api';
import { System, Game } from '../../api/api';

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
                Gerenciamento de Sistemas
            </h2>
            <SystemsList systems={systems} onAdd={handleAdd} />
            <SystemsData systems={systems} games={games} onDelete={handleDelete} />
        </div>
    );
}
