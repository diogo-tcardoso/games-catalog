import { deleteGame, Game } from "../api/api";
import { Columns, DeleteButton, GamesData, TableHeader, AddButton } from "../styles/components-styles/game-list-style";
import { IoTrashOutline,} from "react-icons/io5";
import { IconContext } from "react-icons";

export default function GameList({
    games,
    onAddClick,
    onDeleteComplete }:
    {
        games: Game[]; 
        onAddClick: () => void;
        onDeleteComplete: () => void
    }) {

    const sortedGames = [...games].sort((a, b) => a.nome.localeCompare(b.nome));

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este jogo?");
        if (!confirmDelete) return;

        try {
            await deleteGame(id);
            onDeleteComplete();
        }
        catch (error) {
            console.error("Erro ao excluir o jogo:", error);
            alert("Erro ao excluir o jogo. Tente novamente.");
        }

    }

    return (
        <div>
            <TableHeader>
                <h2 style={{fontSize:"30px", color:"#ffffff", marginBottom:"5px", marginTop: "5px"}}>JOGOS FINALIZADOS</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {sortedGames.map((game) => (
                        <tr key={game.id}>
                            <GamesData>{game.nome}</GamesData>
                            <GamesData>{game.console}</GamesData>
                            <GamesData>{game.genero}</GamesData>
                            <GamesData>{game.tipo}</GamesData>
                            <GamesData>{new Date(game.iniciado).toLocaleDateString()}</GamesData>
                            <GamesData>{new Date(game.finalizado).toLocaleDateString()}</GamesData>
                            <GamesData>{game.tempo}</GamesData>
                            <GamesData>{game.nota}</GamesData>
                            <GamesData>{game.dificuldade}</GamesData>
                            <GamesData>{game.zeramento}</GamesData>
                            <td>
                                <DeleteButton onClick={() => handleDelete(game.id as number)} title="Excluir Jogo">
                                    <IconContext.Provider value={{ size: "20px", style:{marginBottom:"-2px" }}}>
                                        <IoTrashOutline title="delete" />
                                    </IconContext.Provider>
                                </DeleteButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}