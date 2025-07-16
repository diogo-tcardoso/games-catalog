import { useState } from 'react';
import { System, addSystem } from '@/lib/api/system-api'
import { useUser } from '@/context/userContext';

type Props = {
    onAdd: (system: System) => void;
    systems: System[];
};

export default function SystemsList({ onAdd, systems }: Props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');
    const { user } = useUser();

    const handleAdd = async () => {
        const trimmedName = name.trim().toLowerCase();
        if (!trimmedName) return;

        if (!user) {
            alert('Usuário não encontrado. Por favor, faça login.');
            return;
        }
    
        const isDuplicate = systems.some(system => system.name.trim().toLowerCase() === trimmedName);
        if (isDuplicate) {
            alert('Este sistema já foi adicionado.');
            return;
        }

        try {
            const newSystem = await addSystem(user.id, { name, color });
            onAdd(newSystem);
            setName('');
            setColor('#ffffff');
        } catch (err) {
            console.error('Erro ao adicionar sistema:', err);
        }
    };

    return (
        <div className='mb-4 flex items-center mt-4'>
            <input
                type="text"
                placeholder="Nome do sistema"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-[#005DAB] bg-gray-100 rounded-[10px] mr-[10px] h-7.5 text-black pl-2.5 cursor-pointer'
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className='p-0 border border-[#005DAB] rounded-[10px] bg-[#005DAB] cursor-pointer'
            />
            <button
                onClick={handleAdd}
                className='ml-2.5 w-45 rounded-[20px] border border-[#005DAB] bg-gradient-to-b from-[#0095F7] to-[#0076D3] text-white font-bold text-[16px] p-1.5 cursor-pointer'>
                Adicionar Sistema
            </button>
        </div>
    );
}
