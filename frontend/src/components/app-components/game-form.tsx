import { useEffect, useState } from "react";
import { getTypes, Type } from "@/lib/api/type-api";
import { getGenres, Genre } from "@/lib/api/genre-api";
import { getSystems, System } from "@/lib/api/system-api";
import { addNewGame, Game } from "@/lib/api/game-api";
import { Dayjs } from "dayjs";

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
    const [iniciado, setIniciado] = useState<Dayjs | null>(null);
    const [finalizado, setFinalizado] = useState<Dayjs | null>(null);


    const formGroup = "flex flex-row m-0.5"
    const button = "bg-gradient-to-br from-[#A1F9FF] to-[#135266] text-white rounded-[20px] font-sans p-2 cursor-pointer text-[16px] font-bold m-3 min-w-30 hover:bg-gradient-to-l from-#0076D3 to-#005DAB"

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
            iniciado: iniciado?.toDate() || new Date(),
            finalizado: finalizado?.toDate() || new Date(),
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
        <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center max-w-[600px] rounded-2xl p-3 bg-gray-200 mt-3">
            <div>
                <h1 className="mr-[20px] ml-[20px] font-sans text-black font-bold text-2xl p-3">Form Jogo Finalizado</h1>
            </div>

            <div className="flex flex-wrap justify-between">
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Nome:
                        <input type="text" name="nome" value={game.nome} onChange={handleChange} style={{marginLeft:"10px"}} />
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Console:
                        <select name="systemId" value={game.systemId} onChange={handleChange} style={{marginLeft:"10px"}} disabled={loadingSystems}>
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
                        </select>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Genero:
                            <select name="genreId" value={game.genreId} onChange={handleChange} style={{marginLeft:"10px"}}>
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
                            </select>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Tipo:
                        <select name="typeId" value={game.typeId} onChange={handleChange} style={{marginLeft:"10px"}}>
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
                        </ select>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Iniciado:&nbsp;
                        <input />
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Finalizado:&nbsp;
                        <input />
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Tempo:
                        <input type="text" name="tempo" value={game.tempo} onChange={handleChange} placeholder="000:00:00" pattern="^\d{1,3}:\d{2}:\d{2}$" style={{marginLeft:"10px"}}/>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Nota:
                        <input type="number" name="nota" value={game.nota} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Dificuldade:
                        <input type="text" name="dificuldade" value={game.dificuldade} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </label>
                </div>
                <div className={formGroup}>
                    <label className="flex m-0.5 font-bold font-sans text-black justify-between">
                        Zeramento:
                        <input type="text" name="zeramento" value={game.zeramento} onChange={handleChange} style={{marginLeft:"10px"}}/>
                    </label>
                </div>
            </div>
            
            <div>
                <button className={button} type="submit">Salvar</button>
                <button className={button} type="reset" onClick={() => setGame(initialState)}>Limpar</button>
            </div>
        </form>
    )
}