import { useState } from "react";
import { Game, addNewGame } from "../api/api";

const initialState: Game = {
    nome: "",
    console: "",
    genero: "",
    tipo: "",
    iniciado: new Date(),
    finalizado: new Date(),
    tempo: "",
    nota: 0,
    dificuldade: "",
    zeramento: "",
}

export default function GameForm({onCreate}: {onCreate: () => void}) {
    const [game, setGame] = useState<Game>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setGame({...game, [name]: name === "nota" ? Number(value) : value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addNewGame(game);
            setGame(initialState); // Reset the form after submission
            onCreate() // Call the onCreate function to refresh the data
        } catch (error) {
            console.error("Error adding new game:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: "2rem"}}>
            <div>
                <label>
                    Nome:
                    <input type="text" name="nome" value={game.nome} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Console:
                    <input type="text" name="console" value={game.console} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Genero:
                    <input type="text" name="genero" value={game.genero} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Tipo:
                    <input type="text" name="tipo" value={game.tipo} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Iniciado:
                    <input type="date" name="iniciado" value={game.iniciado.toISOString().split('T')[0]} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Finalizado:
                    <input type="date" name="finalizado" value={game.finalizado.toISOString().split('T')[0]} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Tempo:
                    <input type="number" name="tempo" value={game.tempo} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Nota:
                    <input type="number" name="nota" value={game.nota} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Dificuldade:
                    <input type="text" name="dificuldade" value={game.dificuldade} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Zeramento:
                    <input type="text" name="zeramento" value={game.zeramento} onChange={handleChange} />
                </label>
            </div>

            {/* Add more fields as needed */}

            <button type="submit">Adicionar Jogo</button>
            <button type="reset" onClick={() => setGame(initialState)}>Limpar</button>
        </form>
    )
}
