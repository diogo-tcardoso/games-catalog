import { Genre } from "../../api/api";
import { System } from "../../api/system-api";
import { deleteGame, Game } from "../../api/game-api";
import { Columns, DeleteButton, GamesData, TableHeader, AddButton } from "../../styles/components-styles/game-list-style";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function GameList({
    games,
    systems,
    genres,
    onAddClick,
    onDeleteComplete
}: {
    games: Game[];
    systems: System[];
    genres: Genre[];
    onAddClick: () => void;
    onDeleteComplete: () => void;
}) {

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
            <TableHeader>
                <h2 style={{ fontSize: "30px", color: "#ffffff", marginBottom: "5px", marginTop: "5px" }}>
                    JOGOS FINALIZADOS
                </h2>
                <AddButton onClick={onAddClick}>Adicionar Jogo</AddButton>
            </TableHeader>

            <table>
                <thead>
                    <tr>
                        <Columns>Nome</Columns>
                        <Columns>Console</Columns>
                        <Columns>Gênero</Columns>
                        <Columns>Tipo</Columns>
                        <Columns>Iniciado</Columns>
                        <Columns>Finalizado</Columns>
                        <Columns>Tempo</Columns>
                        <Columns>Nota</Columns>
                        <Columns>Dificuldade</Columns>
                        <Columns>Zeramento</Columns>
                        <Columns>Ações</Columns>
                    </tr>
                </thead>
                <tbody>
                    {sortedGames.map((game) => {
                        const systemColor = getSystemColor(game.systemId);
                        const genreColor = getGenreColor(game.genreId);
                        return (
                            <tr key={game.id}>
                                <GamesData>{game.nome}</GamesData>
                                <GamesData style={{ backgroundColor: systemColor, color: "#fff" }}>
                                    {getSystemName(game.systemId)}
                                </GamesData>
                                <GamesData style={{ backgroundColor: genreColor, color: "#fff" }}>
                                    {getGenreName(game.genreId)}
                                </GamesData>
                                <GamesData>{game.typeId}</GamesData>
                                <GamesData>{new Date(game.iniciado).toLocaleDateString()}</GamesData>
                                <GamesData>{new Date(game.finalizado).toLocaleDateString()}</GamesData>
                                <GamesData>{game.tempo}</GamesData>
                                <GamesData>{game.nota}</GamesData>
                                <GamesData>{game.dificuldade}</GamesData>
                                <GamesData>{game.zeramento}</GamesData>
                                <GamesData>
                                    <DeleteButton onClick={() => handleDelete(game.id as number)} title="Excluir Jogo" style={{ marginRight: "8px" }}>
                                        <IconContext.Provider value={{ size: "20px", style: { marginBottom: "-2px" } }}>
                                            <IoTrashOutline title="delete" />
                                        </IconContext.Provider>
                                    </DeleteButton>
                                </GamesData>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}