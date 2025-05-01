import { useState } from 'react';
import { SystemsInput, SystemColor } from '../../styles/systems-styles/systems-styles';
import { AddButton } from '../../styles/components-styles/game-list-style';
import { addGenres, Genre } from '../../api/api';

type Props = {
    onAdd: (NewGenre: Genre) => void;
    genres: Genre[];
};

export default function GenresList({ onAdd, genres }: Props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleAdd = async () => {
        const trimmedName = name.trim().toLowerCase();
        if (!trimmedName) return;
    
        const isDuplicate = genres.some(genre => genre.name.trim().toLowerCase() === trimmedName);
        if (isDuplicate) {
            alert('Este gênero já foi adicionado.');
            return;
        }
    
        try {
            const newGenre = await addGenres({ name, color });
            onAdd(newGenre);
            setName('');
            setColor('#ffffff');
        } catch (err) {
            console.error('Erro ao adicionar gênero:', err);
        }
    };

    return (
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <SystemsInput
                type="text"
                placeholder="Nome do gênero"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <SystemColor
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <AddButton onClick={handleAdd} style={{ marginLeft: '10px', width: '10rem' }}>
                Adicionar Gênero
            </AddButton>
        </div>
    );
}
