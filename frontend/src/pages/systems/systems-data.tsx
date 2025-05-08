import { System } from "../../api/system-api";
import { Game } from "../../api/game-api";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { DeleteButton } from "../../styles/components-styles/game-list-style";
import { Columns, GamesData } from "../../styles/components-styles/game-list-style";

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
        <table>
            <thead>
                <tr>
                    <Columns style={{ width: '10rem' }}>Nome</Columns>
                    <Columns>Jogos Zerados</Columns>
                    <Columns>Tempo Total</Columns>
                    <Columns>Ações</Columns>
                </tr>
            </thead>
            <tbody>
                {systems.map((system) => (
                    <tr key={system.id}>
                        <GamesData style={{ backgroundColor: system.color, color: '#fff', textAlign: 'center' }}>
                            {system.name}
                        </GamesData>
                        <GamesData style={{ backgroundColor: system.color, textAlign: 'center', color: '#fff' }}>
                            {countGames(system.id)}
                        </GamesData>
                        <GamesData style={{ backgroundColor: system.color, textAlign: 'center', color: '#fff' }}>
                            {formatTime(sumTime(system.id))}
                        </GamesData>
                        <GamesData style={{ backgroundColor: system.color, textAlign: 'center' }}>
                            <DeleteButton onClick={() => onDelete(system.id)} style={{ marginRight: "8px" }}>
                                <IconContext.Provider value={{ size: "20px", style: { marginBottom: "-2px" } }}>
                                    <IoTrashOutline title="delete" />
                                </IconContext.Provider>
                            </DeleteButton>
                        </GamesData>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}