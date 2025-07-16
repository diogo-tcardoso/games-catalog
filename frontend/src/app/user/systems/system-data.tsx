import { System } from "@/lib/api/system-api";
import { Game } from "@/lib/api/game-api";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

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

    const columns = "font-bold text-[16px] p-2 border border-[#005DAB] bg-gradient-to-b from-[#0095F7] to-[#0076D3] uppercase font-sans"
    const gameData = "text-center bg-gray-100 pl-2.5 text-[17px] pr-2.5 text-[#021527]"

    return (
        <table className="flex flex-col justify-center items-center mt-3">
            <thead>
                <tr>
                    <th className={columns}>Nome</th>
                    <th className={columns}>Jogos Zerados</th>
                    <th className={columns}>Tempo Total</th>
                    <th className={columns}>Ações</th>
                </tr>
            </thead>
            <tbody>
                {systems.map((system) => (
                    <tr key={system.id}>
                        <td className={gameData} style={{ backgroundColor: system.color, color: '#fff', textAlign: 'center' }}>
                            {system.name}
                        </td>
                        <td className={gameData} style={{ backgroundColor: system.color, textAlign: 'center', color: '#fff' }}>
                            {countGames(system.id)}
                        </td>
                        <td className={gameData} style={{ backgroundColor: system.color, textAlign: 'center', color: '#fff' }}>
                            {formatTime(sumTime(system.id))}
                        </td>
                        <td className={gameData} style={{ backgroundColor: system.color, textAlign: 'center' }}>
                            <button 
                                onClick={() => onDelete(system.id)}
                                className="bg-gray-100 rounded-[10px] border border-[#005DAB] p-0.5 text-[#005DAB] pb-[-5px] ml-2.5 cursor-pointer hover:text-red-500 hover:border-red-500">
                                <IconContext.Provider value={{ size: "20px", style: { marginBottom: "-2px" } }}>
                                    <IoTrashOutline title="delete" />
                                </IconContext.Provider>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}