import { Game } from "../api/api";

export default function GameList({ games }: { games: Game[] }) {
    const sortedGames = [...games].sort((a, b) => a.nome.localeCompare(b.nome));

    return (
        <div>
            <h2>Jogos finalizados</h2>
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