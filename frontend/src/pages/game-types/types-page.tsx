import { useState, useEffect } from "react";
import { Game, getPrincipalTable, Type, getTypes, deleteType } from "../../api/api";
import TypeData from "./types-data";
import TypesList from "../../components/types/types-list";

export default function TypePage() {
    const [type, setType] = useState<Type[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [typeData, gamesData] = await Promise.all([
                getTypes(),
                getPrincipalTable()
            ]);
            setType(typeData);
            setGames(gamesData);
        };

        loadData();
    }, []);

    const handleAdd = (NewType: Type) => {
        setType(prev => [...prev, NewType]);
    };

    const handleDelete = async (id: number) => {
        await deleteType(id);
        setType(prev => prev.filter(type => type.id !== id));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '2rem' }}>
                Estatísticas de Gêneros (Gênero / Jogos Zerados / Tempo)
            </h2>
            <TypesList types={type} onAdd={handleAdd} />
            <TypeData types={type} games={games} onDelete={handleDelete} />
        </div>
    );
}