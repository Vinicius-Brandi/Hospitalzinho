import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { api } from "../../services/api";
import "./SearchHospital.css"

interface Sugestao {
    id: string;
    [key: string]: any;
}

export function SearchHospital({ setarValorPesquisa }: { setarValorPesquisa: (valor: string) => void }) {
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [tipoPesquisa, setTipoPesquisa] = useState('nome');
    const [valorPesquisa, setValorPesquisa] = useState('');
    const [isSugestoesVisivel, setIsSugestoesVisivel] = useState(false);
    const selecionandoRef = useRef(false);

    const buscarSugestoes = debounce(async (texto: string) => {
        try {
            const response = await api.get(
                `/HospitalUnidade?$filter=startswith(tolower(${tipoPesquisa}), tolower('${texto}'))`
            );
            const data = response.data;
            const filtrados = data.filter((e: any) =>
                String(e[tipoPesquisa]).toLowerCase().includes(texto.toLowerCase())
            );
            setSugestoes(filtrados);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, 500);

    useEffect(() => {
        if (selecionandoRef.current) {
            selecionandoRef.current = false;
            return;
        }

        if (valorPesquisa.trim() !== "") {
            buscarSugestoes(valorPesquisa);
        }
        else {
            setSugestoes([]);
        }

        return () => {
            buscarSugestoes.cancel();
        };
    }, [valorPesquisa]);

    function setarValor(e: React.ChangeEvent<HTMLInputElement> | string) {
        let novoValor = "";

        if (typeof e === "string") {
            novoValor = e;
        } else {
            novoValor = e.target.value;
        }

        setValorPesquisa(novoValor);

        setarValorPesquisa(novoValor);
    }

    function handleFocus() {
        setIsSugestoesVisivel(true);
    }

    function handleBlur() {
        setTimeout(() => {
            setIsSugestoesVisivel(false);
        }, 100);
    }

    function handleSelect(nome: string) {
        selecionandoRef.current = true;
        setIsSugestoesVisivel(false);
        setarValor(nome);
        setarValorPesquisa(nome);
    }

    function setarTipoPesquisa(tipo: string) {
        setSugestoes([]);
        setTipoPesquisa(tipo);
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="tipo-pesquisa">Pesquisar por:</label>
                <select id="tipo-pesquisa" name="tipo-pesquisa" onChange={(e) => setarTipoPesquisa(e.target.value)} value={tipoPesquisa}>
                    <option value="nome">Nome</option>
                    <option value="cnes">CNES</option>
                </select>
                <div className="input-sugestion-container">
                    <input
                        type="text"
                        id="valor-pesquisa"
                        name="valor-pesquisa"
                        placeholder={`Digite o ${tipoPesquisa} do hospital`}
                        maxLength={255}
                        style={{ marginTop: "0.5rem" }}
                        value={valorPesquisa}
                        onChange={(e) => setarValor(e)}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur()}
                        autoComplete="off"
                    />
                    {sugestoes.length > 0 && isSugestoesVisivel && (
                        <ul className="sugestoes-lista">
                            {sugestoes.map((s, i) => (
                                <li key={i} onClick={() => handleSelect(s[tipoPesquisa])}>
                                    {s[tipoPesquisa]}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}