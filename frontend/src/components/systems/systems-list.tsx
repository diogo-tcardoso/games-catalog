import { useState } from 'react';
import { SystemsInput, SystemColor } from '../../styles/systems-styles/systems-styles';
import { AddButton } from '../../styles/components-styles/game-list-style';
import { System, addSystem } from '../../api/system-api';

type Props = {
    onAdd: (system: System) => void;
    systems: System[];
};

export default function SystemsList({ onAdd, systems }: Props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleAdd = async () => {
        const trimmedName = name.trim().toLowerCase();
        if (!trimmedName) return;
    
        const isDuplicate = systems.some(system => system.name.trim().toLowerCase() === trimmedName);
        if (isDuplicate) {
            alert('Este sistema já foi adicionado.');
            return;
        }
    
        try {
            const newSystem = await addSystem({ name, color });
            onAdd(newSystem);
            setName('');
            setColor('#ffffff');
        } catch (err) {
            console.error('Erro ao adicionar sistema:', err);
        }
    };

    return (
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
            <AddButton onClick={handleAdd} style={{ marginLeft: '10px', width: '10rem' }}>
                Adicionar Sistema
            </AddButton>
        </div>
    );
}
