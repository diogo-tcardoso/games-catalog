import { Game } from "../api/api";
import { Columns } from "../styles/game-list-style";

export default function GameList({ games }: { games: Game[] }) {
    const sortedGames = [...games].sort((a, b) => a.nome.localeCompare(b.nome));

    return (
        <div>
            <h2>Jogos finalizados</h2>
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
                            <td>{game.nome}</td>
                            <td>{game.console}</td>
                            <td>{game.genero}</td>
                            <td>{game.tipo}</td>
                            <td>{new Date(game.iniciado).toLocaleDateString()}</td>
                            <td>{new Date(game.finalizado).toLocaleDateString()}</td>
                            <td>{game.tempo}</td>
                            <td>{game.nota}</td>
                            <td>{game.dificuldade}</td>
                            <td>{game.zeramento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}