import { useState } from 'react';
import { AddButton } from '../../styles/components-styles/game-list-style';
import { SystemsInput, SystemColor } from '../../styles/systems-styles/systems-styles';

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
    const [games, ] = useState<Game[]>([
    { id: 1, systemId: 1, timePlayed: 12 },
    { id: 2, systemId: 1, timePlayed: 7 },
    { id: 3, systemId: 2, timePlayed: 4 }
    ]);

    const [name, setName] = useState('');
    const [color, setColor] = useState('#cccccc');

    const handleAddSystem = () => {
    if (!name.trim()) return;

    const newSystem: System = {
        id: Date.now(),
        name,
        color
    };

    setSystems(prev => [...prev, newSystem]);
    setName('');
    setColor('#ffffff');
    };

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
            <h2>Gerenciamento de Sistemas</h2>

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
                <tr>
                <th style={{width:'10rem'}}>Nome</th>
                <th>Jogos Zerados</th>
                <th>Tempo Total (h)</th>
                </tr>
            </thead>
            <tbody>
                {systems.map(system => (
                <tr key={system.id}>
                    <td style={{ backgroundColor: system.color, color: '#ffffff', textAlign: 'center' }}>
                    {system.name}
                    </td>
                    <td style={{ backgroundColor: system.color, textAlign:'center'}}>{countGames(system.id)}</td>
                    <td style={{ backgroundColor: system.color, textAlign:'center'}}>{sumTimePlayed(system.id)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}