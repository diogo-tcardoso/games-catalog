import { useState } from 'react';
import { SystemsInput, SystemColor } from '../../styles/systems-styles/systems-styles';
import { AddButton } from '../../styles/components-styles/game-list-style';
import { addType, Type } from '../../api/type-api';

type Props = {
    onAdd: (NewType: Type) => void;
    types: Type[];
};

export default function TypesList({ onAdd, types }: Props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleAdd = async () => {
        const trimmedName = name.trim().toLowerCase();
        if (!trimmedName) return;
    
        const isDuplicate = types.some(type => type.name.trim().toLowerCase() === trimmedName);
        if (isDuplicate) {
            alert('Este tipo de jogo já foi adicionado.');
            return;
        }
    
        try {
            const newType = await addType({ name, color });
            onAdd(newType);
            setName('');
            setColor('#ffffff');
        } catch (err) {
            console.error('Erro ao adicionar tipo de jogo:', err);
        }
    };

    return (
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <SystemsInput
                type="text"
                placeholder="Nome do tipo"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <SystemColor
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <AddButton onClick={handleAdd} style={{ marginLeft: '10px', width: '10rem' }}>
                Adicionar Tipo
            </AddButton>
        </div>
    );
}
