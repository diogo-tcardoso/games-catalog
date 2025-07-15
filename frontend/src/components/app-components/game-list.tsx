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
    
    const tableMenu = "font-bold text-[16px] p-2 border border-[#005DAB] bg-gradient-to-b from-[#0095F7] to-[#0076D3] uppercase font-sans"

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
            <div className="flex justify-items-center justify-evenly font-sans items-center mb-3.5">
                <h2 className="text-3xl mb-1 mt-1 text-gray-100">
                    JOGOS FINALIZADOS
                </h2>
                <button className="rounded-2xl bg-gradient-to-b from-[#0095F7] to-[#0076D3] border border-[#005DAB] text-gray-100 font-bold text-[16px] w-36 p-1 hover:cursor-pointer hover:bg-gradient-to-t" onClick={onAddClick}>Adicionar Jogo</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className={tableMenu}>Nome</th>
                        <th className={tableMenu}>Console</th>
                        <th className={tableMenu}>Gênero</th>
                        <th className={tableMenu}>Tipo</th>
                        <th className={tableMenu}>Iniciado</th>
                        <th className={tableMenu}>Finalizado</th>
                        <th className={tableMenu}>Tempo</th>
                        <th className={tableMenu}>Nota</th>
                        <th className={tableMenu}>Dificuldade</th>
                        <th className={tableMenu}>Zeramento</th>
                        <th className={tableMenu}>Ações</th>
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