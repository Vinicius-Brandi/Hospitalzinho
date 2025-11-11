import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import './InputSugestion.css'
import { api } from "../../services/api";

export default function InputSugestion({ placeholder, tipoDado }: { placeholder: string, tipoDado: string }) {
    const [valor, setValor] = useState("");
    const [sugestoes, setSugestoes] = useState<string[]>([]);
    const selecionandoRef = useRef(false);

    const buscarSugestoes = debounce(async (texto: string) => {
        try {
            const response = await api.get(`/${tipoDado}?$filter=contains(tolower(nome), tolower('${texto}'))`);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        const exemplos = ["Hospital Central", "Hospital Regional", "Hospital da Criança"];
        const filtrados = exemplos.filter((e) => e.toLowerCase().includes(texto.toLowerCase()));
        setSugestoes(filtrados);
    }, 500);

    useEffect(() => {
        if (selecionandoRef.current) {
            selecionandoRef.current = false;
            return;
        }

        if (valor.trim() !== "") {
            buscarSugestoes(valor);
        }
        else {
            setSugestoes([]);
        }

        return () => {
            buscarSugestoes.cancel();
        };
    }, [valor]);

    const handleSelect = (sugestao: string) => {
        selecionandoRef.current = true;
        setValor(sugestao);
        setSugestoes([]);
    };

    return (
        <div className="input-sugestion-container">
            <input type="text" placeholder={placeholder} value={valor} onChange={(e) => setValor(e.target.value)} />

            {sugestoes.length > 0 && (
                <ul className="sugestoes-lista">
                    {sugestoes.map((s, i) => (
                        <li key={i} onClick={() => handleSelect(s)}>
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}