import { useState } from "react";
import { Game, addNewGame } from "../api/api";
import { Form, FormGroup, Label, Button } from "../styles/game-form-styles";

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
        <Form onSubmit={handleSubmit}>
            <h1 style={{padding:"7px"}}>Form Jogo Finalizado</h1>
            <FormGroup>
                <Label>
                    Nome:
                    <input type="text" name="nome" value={game.nome} onChange={handleChange} style={{marginLeft:"10px"}} />
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Console:
                    <input type="text" name="console" value={game.console} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Genero:
                    <input type="text" name="genero" value={game.genero} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Tipo:
                    <input type="text" name="tipo" value={game.tipo} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Iniciado:
                    <input type="date" name="iniciado" value={game.iniciado.toISOString().split('T')[0]} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Finalizado:
                    <input type="date" name="finalizado" value={game.finalizado.toISOString().split('T')[0]} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Tempo:
                    <input type="text" name="tempo" value={game.tempo} onChange={handleChange} placeholder="000:00:00" pattern="^\d{1,3}:\d{2}:\d{2}$" style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Nota:
                    <input type="number" name="nota" value={game.nota} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Dificuldade:
                    <input type="text" name="dificuldade" value={game.dificuldade} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    Zeramento:
                    <input type="text" name="zeramento" value={game.zeramento} onChange={handleChange} style={{marginLeft:"10px"}}/>
                </Label>
            </FormGroup>

            <Button type="submit" style={{marginLeft:"180px"}}>Adicionar Jogo</Button>
            <Button type="reset" onClick={() => setGame(initialState)}>Limpar</Button>
        </Form>
    )
}
