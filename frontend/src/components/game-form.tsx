import { useState } from "react";
import { Game, addNewGame } from "../api/api";
import { Form, FormGroup, Label, Button, DataInput } from "../styles/components-styles/game-form-styles";

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
        let updatedValue: string | number | Date = value;

        if (name === "nota"){
            updatedValue = Number(value);
        } else if (name === "iniciado" || name === "finalizado") {
            updatedValue = new Date(value);
        }

        setGame((prevGame) => ({
            ...prevGame,
            [name]: updatedValue
        }))
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
            <div>
                <h1 style={{color: "#000000", marginRight: "20px", marginLeft: "20px", fontFamily: "Winky Rough"}}>Form Jogo Finalizado</h1>
            </div>

            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                <FormGroup>
                    <Label>
                        Nome:
                        <DataInput type="text" name="nome" value={game.nome} onChange={handleChange} style={{marginLeft:"10px"}} />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Console:
                        <DataInput type="text" name="console" value={game.console} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Genero:
                        <DataInput type="text" name="genero" value={game.genero} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Tipo:
                        <DataInput type="text" name="tipo" value={game.tipo} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Iniciado:
                        <DataInput type="date" name="iniciado" value={game.iniciado.toISOString().split('T')[0]} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Finalizado:
                        <DataInput type="date" name="finalizado" value={game.finalizado.toISOString().split('T')[0]} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Tempo:
                        <DataInput type="text" name="tempo" value={game.tempo} onChange={handleChange} placeholder="000:00:00" pattern="^\d{1,3}:\d{2}:\d{2}$" style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Nota:
                        <DataInput type="number" name="nota" value={game.nota} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Dificuldade:
                        <DataInput type="text" name="dificuldade" value={game.dificuldade} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Zeramento:
                        <DataInput type="text" name="zeramento" value={game.zeramento} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </Label>
                </FormGroup>
            </div>
            
            <div>
                <Button type="submit">Salvar Jogo</Button>
                <Button type="reset" onClick={() => setGame(initialState)}>Limpar</Button>
            </div>
        </Form>
    )
}
