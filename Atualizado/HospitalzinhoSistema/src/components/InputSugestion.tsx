import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import './InputSugestion.css'
import { api } from "../../services/api";
import { HOSPITALID } from "../../models/hospital";

interface Sugestao {
    id: string;
    [key: string]: any;
}

export default function InputSugestion({ placeholder, tipoDado, nameInput, setValorTeste, valorBuscarAPI, temHospitalId }: { placeholder: string, tipoDado: string, nameInput: string, setValorTeste?: (valor: React.ChangeEvent<HTMLInputElement>) => void, valorBuscarAPI: string, temHospitalId?: boolean }) {
    const [valor, setValor] = useState("");
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const selecionandoRef = useRef(false);

    const buscarSugestoes = debounce(async (texto: string) => {
        try {
            let filterQuery = `startswith(tolower(${valorBuscarAPI}), tolower('${texto}'))`;
            if (temHospitalId) {
                filterQuery += ` and hospitalId eq ${HOSPITALID}`;
            }
            const url = `/${tipoDado}?$filter=${filterQuery}`;
            const response = await api.get(
                url
            );
            const data = response.data;
            const filtrados = data.filter((e: any) =>
                String(e[valorBuscarAPI]).toLowerCase().includes(texto.toLowerCase())
            );
            setSugestoes(filtrados);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }, 500);

    function setarValor(e: React.ChangeEvent<HTMLInputElement>) {
        setValor(e.target.value);
        setValorTeste?.(e);
    }

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
        setValorTeste?.({ target: { name: nameInput, value: sugestao } } as React.ChangeEvent<HTMLInputElement>);
        setSugestoes([]);
    };

    return (
        <div className="input-sugestion-container">
            {valorBuscarAPI === "numero" && (<input type="number" placeholder={placeholder} name={nameInput} value={valor} onChange={(e) => setarValor(e)} />)}
            {valorBuscarAPI !== "numero" && (<input type="text" placeholder={placeholder} name={nameInput} value={valor} onChange={(e) => setarValor(e)} />)}

            {sugestoes.length > 0 && (
                <ul className="sugestoes-lista">
                    {sugestoes.map((s, i) => (
                        <li key={i} onClick={() => handleSelect(s[valorBuscarAPI])}>
                            {s[valorBuscarAPI]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}