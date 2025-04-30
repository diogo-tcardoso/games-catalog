import { useState, useEffect } from 'react';
import { AddButton } from '../../styles/components-styles/game-list-style';
import { SystemsInput, SystemColor } from '../../styles/systems-styles/systems-styles';
import { getSystems, addSystem, deleteSystem } from '../../api/api'; // Supondo que você tenha essas funções no seu arquivo de API

type System = {
    id: number;
    name: string;
    color: string;
};

type Game = {
    id: number;
    systemId: number;
    timePlayed: number; // tempo em horas
};

export default function SystemsPage() {
    const [systems, setSystems] = useState<System[]>([]);
    const [games, setGames] = useState<Game[]>([]); // Supondo que os jogos também sejam carregados do backend
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    // Carregar sistemas do backend
    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const data = await getSystems();
                setSystems(data);
            } catch (error) {
                console.error("Erro ao buscar sistemas:", error);
            }
        };
        fetchSystems();
    }, []);

    // Adicionar um novo sistema
    const handleAddSystem = async () => {
        if (!name.trim()) return;

        const newSystem = {
            name,
            color
        };

        try {
            const updatedSystems = await addSystem(newSystem);
            setSystems(updatedSystems);
            setName('');
            setColor('#ffffff');
        } catch (error) {
            console.error("Erro ao adicionar novo sistema:", error);
        }
    };

    // Deletar um sistema
    const handleDeleteSystem = async (id: number) => {
        try {
            await deleteSystem(id);
            setSystems(systems.filter(system => system.id !== id));
        } catch (error) {
            console.error("Erro ao excluir sistema:", error);
        }
    };

    // Contagem de jogos e tempo total jogado
    const countGames = (systemId: number) => {
        return games.filter(game => game.systemId === systemId).length;
    };

    const sumTimePlayed = (systemId: number) => {
        return games
            .filter(game => game.systemId === systemId)
            .reduce((acc, cur) => acc + cur.timePlayed, 0);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 'bold', fontFamily: 'Winky Rough, saint-serif', fontSize: '2rem' }}>Gerenciamento de Sistemas</h2>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <SystemsInput
                    type="text"
                    placeholder="Nome do sistema"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <SystemColor
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <AddButton onClick={handleAddSystem} style={{ marginLeft: '10px', width: '10rem' }}>
                    Adicionar Sistema
                </AddButton>
            </div>

            <table border={1} cellPadding={8}>
                <thead>
                    <tr style={{ backgroundColor: '#005dab', color: '#ffffff', fontWeight: 'bold', fontFamily: 'Winky Rough, sans-serif', fontSize: '1.3rem' }}>
                        <th style={{ width: '10rem' }}>Nome</th>
                        <th>Jogos Zerados</th>
                        <th>Tempo Total (h)</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {systems.map(system => (
                        <tr key={system.id}>
                            <td style={{ backgroundColor: system.color, color: '#ffffff', textAlign: 'center' }}>
                                {system.name}
                            </td>
                            <td style={{ backgroundColor: system.color, textAlign: 'center' }}>{countGames(system.id)}</td>
                            <td style={{ backgroundColor: system.color, textAlign: 'center' }}>{sumTimePlayed(system.id)}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleDeleteSystem(system.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
