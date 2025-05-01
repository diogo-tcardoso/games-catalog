import { System, Game } from "../../api/api";
import { IoTrashOutline,} from "react-icons/io5";
import { IconContext } from "react-icons";
import { DeleteButton } from "../../styles/components-styles/game-list-style";

type Props = {
    systems: System[];
    games: Game[];
    onDelete: (id: number) => void;
};

function formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map(unit => String(unit).padStart(2, '0')).join(':');
}

export default function SystemsData({ systems, games, onDelete }: Props) {
    const countGames = (systemId: number) =>
        games.filter((game) => game.systemId === systemId).length;

    const sumTime = (systemId: number) =>
        games
            .filter((game) => game.systemId === systemId)
            .reduce((acc, cur) => acc + Number(cur.tempo), 0);

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
                {systems.map((system) => (
                    <tr key={system.id}>
                        <td style={{ backgroundColor: system.color, color: '#fff', textAlign: 'center' }}>
                            {system.name}
                        </td>
                        <td style={{ backgroundColor: system.color, textAlign: 'center' }}>
                            {countGames(system.id)}
                        </td>
                        <td style={{ backgroundColor: system.color, textAlign: 'center' }}>
                            {formatTime(sumTime(system.id))}
                        </td>
                        <td style={{ backgroundColor: system.color, textAlign: 'center' }}>
                            <DeleteButton onClick={() => onDelete(system.id)} style={{ marginRight: "8px" }}>
                                <IconContext.Provider value={{ size: "20px", style:{marginBottom:"-2px"}}}>
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
