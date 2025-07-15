import { Type } from "@/lib/api/type-api";
import { Genre } from "@/lib/api/genre-api"; 
import { System } from "@/lib/api/system-api";
import { deleteGame, Game } from "@/lib/api/game-api";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function GameList({
    games,
    systems,
    genres,
    types,
    onAddClick,
    onDeleteComplete
}: {
    games: Game[];
    systems: System[];
    genres: Genre[];
    types: Type[];
    onAddClick: () => void;
    onDeleteComplete: () => void;
}){

    const sortedGames = [...games].sort((a, b) => a.nome.localeCompare(b.nome));

    const getSystemName = (id: number) => {
        const system = systems.find(s => s.id === id);
        return system ? system.name : 'Desconhecido';
    };

    const getSystemColor = (id: number) => {
        const system = systems.find(s => s.id === id);
        return system ? system.color : '#ffffff';
    };

    const getGenreName = (id: number) => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : 'Desconhecido';
    };

    const getGenreColor = (id: number) => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.color : '#cccccc';
    };

    const getTypeName = (id: number) => {
        const type = types.find(t => t.id === id);
        return type ? type.name : 'Desconhecido';
    };

    const getTypeColor = (id: number) => {
        const type = types.find(t => t.id === id);
        return type ? type.color : '#cccccc';
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este jogo?");
        if (!confirmDelete) return;

        try {
            await deleteGame(id);
            onDeleteComplete();
        } catch (error) {
            console.error("Erro ao excluir o jogo:", error);
            alert("Erro ao excluir o jogo. Tente novamente.");
        }
    };

    return (
        <div>
            <div>
                <h2 style={{ fontSize: "30px", color: "#ffffff", marginBottom: "5px", marginTop: "5px" }}>
                    JOGOS FINALIZADOS
                </h2>
                <button onClick={onAddClick}>Adicionar Jogo</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Console</th>
                        <th>Gênero</th>
                        <th>Tipo</th>
                        <th>Iniciado</th>
                        <th>Finalizado</th>
                        <th>Tempo</th>
                        <th>Nota</th>
                        <th>Dificuldade</th>
                        <th>Zeramento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedGames.map((game) => {
                        const systemColor = getSystemColor(game.systemId);
                        const genreColor = getGenreColor(game.genreId);
                        return (
                            <tr key={game.id}>
                                <td>{game.nome}</td>
                                <td style={{ backgroundColor: systemColor, color: "#fff" }}>
                                    {getSystemName(game.systemId)}
                                </td>
                                <td style={{ backgroundColor: genreColor, color: "#fff" }}>
                                    {getGenreName(game.genreId)}
                                </td>
                                <td style={{ backgroundColor: getTypeColor(game.typeId), color: "#fff" }}>
                                    {getTypeName(game.typeId)}
                                </td>
                                <td>{new Date(game.iniciado).toLocaleDateString()}</td>
                                <td>{new Date(game.finalizado).toLocaleDateString()}</td>
                                <td>{game.tempo}</td>
                                <td>{game.nota}</td>
                                <td>{game.dificuldade}</td>
                                <td>{game.zeramento}</td>
                                <td>
                                    <button onClick={() => handleDelete(game.id as number)} title="Excluir Jogo" style={{ marginRight: "8px" }}>
                                        <IconContext.Provider value={{ size: "20px", style: { marginBottom: "-2px" } }}>
                                            <IoTrashOutline title="delete" />
                                        </IconContext.Provider>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}