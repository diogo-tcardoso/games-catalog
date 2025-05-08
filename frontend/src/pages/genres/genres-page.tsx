import { useState, useEffect } from "react";
import { deleteGenres, Genre, getGenres } from "../../api/api";
import { Game, getPrincipalTable } from "../../api/game-api";
import GenreData from "./genre-data";
import GenresList from "../../components/genres/genres-list";

export default function GenrePage() {
    const [genre, setGenre] = useState<Genre[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const [genreData, gamesData] = await Promise.all([
                getGenres(),
                getPrincipalTable()
            ]);
            setGenre(genreData);
            setGames(gamesData);
        };

        loadData();
    }, []);

    const handleAdd = (NewGenre: Genre) => {
        setGenre(prev => [...prev, NewGenre]);
    };

    const handleDelete = async (id: number) => {
        await deleteGenres(id);
        setGenre(prev => prev.filter(genre => genre.id !== id));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '2rem' }}>
                Estatísticas de Gêneros (Gênero / Jogos Zerados / Tempo)
            </h2>
            <GenresList genres={genre} onAdd={handleAdd} />
            <GenreData genres={genre} games={games} onDelete={handleDelete} />
        </div>
    );
}