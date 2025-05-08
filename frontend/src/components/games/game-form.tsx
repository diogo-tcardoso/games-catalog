import { useEffect, useState } from "react";
import { getTypes, Type } from "../../api/type-api";
import { getGenres, Genre } from "../../api/genre-api";
import { getSystems, System } from "../../api/system-api";
import { addNewGame, Game } from "../../api/game-api";
import { Form, FormGroup, Label, Button, DataInput, SystemSelect, CalendarInput, GenreSelect, TypeSelect } from "../../styles/components-styles/game-form-styles";
import DatePicker from "react-datepicker";

const initialState: Game = {
    nome: "",
    genreId: 0,
    typeId: 0,
    iniciado: new Date(),
    finalizado: new Date(),
    tempo: "",
    nota: 0,
    dificuldade: "",
    zeramento: "",
    systemId: 0,
}

export default function GameForm({onCreate}: {onCreate: () => void}) {
    const [game, setGame] = useState<Game>(initialState);
    const [systems, setSystems] = useState<System[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [loadingSystems, setLoadingSystems] = useState(true);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [iniciado, setIniciado] = useState<Date | null>(null);
    const [finalizado, setFinalizado] = useState<Date | null>(null);


    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const systemsData = await getSystems();
                setSystems(systemsData);
            } catch (error) {
                console.error("Error fetching systems:", error);
            } finally {
                setLoadingSystems(false);
            }
        };

        fetchSystems();
    }, [])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getGenres();
                setGenres(response);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await getTypes();
                setTypes(response);
            } catch (error) {
                console.error("Error fetching types:", error);
            } finally {
                setLoadingTypes(false);
            }
        }
        fetchTypes();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let updatedValue: string | number | Date = value;

        if (name === "nota"){
            updatedValue = Number(value);
        } else if (name === "iniciado" || name === "finalizado") {
            updatedValue = new Date(value);
        } else if (name === "systemId" || name === "genreId" || name === "typeId") {
            updatedValue = Number(value);
        }        

        setGame((prevGame) => ({
            ...prevGame,
            [name]: updatedValue
        }))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (systems.length === 0) {
            alert("Cadastre um sistema antes de cadastrar jogos.");
            return;
        }
    
        if (genres.length === 0) {
            alert("Cadastre um gênero antes de cadastrar jogos.");
            return;
        }

        if (types.length === 0) {
            alert("Cadastre um tipo antes de cadastrar jogos.");
            return;
        }
    
        if (!iniciado || !finalizado) {
            alert("Preencha as datas de início e finalização.");
            return;
        }
    
        const gameToSubmit: Game = {
            ...game,
            iniciado,
            finalizado,
        };
    
        try {
            await addNewGame(gameToSubmit);
            setGame(initialState);
            setIniciado(null);
            setFinalizado(null);
            onCreate();
        } catch (error: unknown) {
            const backendMessage = error instanceof Error ? error.message : "Erro desconhecido";
            console.error("Erro ao adicionar novo jogo:", backendMessage);
            alert(backendMessage);
        }
        
    };

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
                        <SystemSelect name="systemId" value={game.systemId} onChange={handleChange} style={{marginLeft:"10px"}} disabled={loadingSystems}>
                            {loadingSystems ? (
                                <option>Carregando sistemas...</option>
                            ) : (
                                <>
                                    <option value={0}>Selecione um sistema</option>
                                    {systems.map((system) => (
                                        <option key={system.id} value={system.id}>
                                            {system.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </SystemSelect>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Genero:
                            <GenreSelect name="genreId" value={game.genreId} onChange={handleChange} style={{marginLeft:"10px"}}>
                            {loadingGenres ? (
                                <option>Carregando gêneros...</option>
                            ) : (
                                <>
                                    <option value={0}>Selecione um sistema</option>
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.name}
                                        </option>
                                    ))}
                                </>
                            )}
                            </GenreSelect>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Tipo:
                        <TypeSelect name="typeId" value={game.typeId} onChange={handleChange} style={{marginLeft:"10px"}}>
                            {loadingTypes ? (
                                <option>Carregando tipos...</option>
                            ) : (
                                <>
                                    <option value={0}>Selecione um tipo</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </>
                            )}
                        </ TypeSelect>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Iniciado:&nbsp;
                        <DatePicker selected={iniciado} onChange={(date) => setIniciado(date)} dateFormat="dd/MM/yyyy" customInput={<CalendarInput />} />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Finalizado:&nbsp;
                        <DatePicker selected={finalizado} onChange={(date) => setFinalizado(date)} dateFormat="dd/MM/yyyy" customInput={<CalendarInput />} />
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