import { Genre, Game } from "../../api/api";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { DeleteButton } from "../../styles/components-styles/game-list-style";

type Props = {
    genres: Genre[];
    games: Game[];
    onDelete: (id: number) => void;
};

function formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map(unit => String(unit).padStart(2, '0')).join(':');
}

export default function GenreData({ genres, games, onDelete }: Props) {
    const countGames = (systemId: number) =>
        games.filter((game) => game.systemId === systemId).length;

    const sumTime = (systemId: number): number => {
        const toSeconds = (tempo: string) => {
            const [h, m, s] = tempo.split(':').map(Number);
            return h * 3600 + m * 60 + s;
        };

        return games
            .filter((game) => game.systemId === systemId)
            .reduce((acc, cur) => acc + toSeconds(cur.tempo), 0);
    };

    return (
        <table border={1} cellPadding={8}>
            <thead>
                <tr style={{ backgroundColor: '#005dab', color: '#ffffff', fontWeight: 'bold' }}>
                    <th style={{ width: '10rem' }}>Nome</th>
                    <th>Jogos Zerados</th>
                    <th>Tempo Total</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {genres.map((genre) => (
                    <tr key={genre.id}>
                        <td style={{ backgroundColor: genre.color, color: '#fff', textAlign: 'center' }}>
                            {genre.name}
                        </td>
                        <td style={{ backgroundColor: genre.color, textAlign: 'center', color: '#fff' }}>
                            {countGames(genre.id)}
                        </td>
                        <td style={{ backgroundColor: genre.color, textAlign: 'center', color: '#fff' }}>
                            {formatTime(sumTime(genre.id))}
                        </td>
                        <td style={{ backgroundColor: genre.color, textAlign: 'center' }}>
                            <DeleteButton onClick={() => onDelete(genre.id)} style={{ marginRight: "8px" }}>
                                <IconContext.Provider value={{ size: "20px", style: { marginBottom: "-2px" } }}>
                                    <IoTrashOutline title="delete" />
                                </IconContext.Provider>
                            </DeleteButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}