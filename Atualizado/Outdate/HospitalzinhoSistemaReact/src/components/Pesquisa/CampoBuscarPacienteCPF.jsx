import { useEffect, useRef, useState } from "react";

export function CampoBuscarPacienteCPF({
    onSugestaoSelecionada,
    onPesquisar,
    placeholder = "Digite o CPF ou CNS para buscar",
}){
    const [sugestoes, setSugestoes] = useState([]);
    const [cpf, setCpf] = useState('');
    const ignorarBuscaRef = useRef(false);

    useEffect(() => {
        if (ignorarBuscaRef.current) {
            ignorarBuscaRef.current = false;
            return;
        }

        if(cpf.trim().length < 3){
            setSugestoes([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const resposta = await fetch(`http://localhost:5139/api/Paciente/BuscarSugestoesPacientePorCPF/${cpf}`);
                if(resposta.ok) {
                    const dados = await resposta.json();
                    console.log(dados);
                    setSugestoes( dados || []);
                } else {
                    setSugestoes([]);
                }
            } catch (err) {
                console.log(err);
                setSugestoes([]);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [cpf]);

    const selecionarSugestao = (s) => {
        ignorarBuscaRef.current = true;
        setCpf(s.cpf);
        setSugestoes([]);
        if(onSugestaoSelecionada) onSugestaoSelecionada(s.cpf);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onPesquisar) onPesquisar(cpf);
    }

    return (
        <section id="pesquisa-paciente">
            <h2>Buscar Paciente</h2>
            <form className="form-pesquisa" onSubmit={handleSubmit}>
                <div className="form-group" id="pesquisa-wrapper">
                    <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                    <input 
                        type="text" 
                        id="cpf-paciente"
                        placeholder={placeholder}
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required 
                        autoComplete="off"
                    />
                    {sugestoes.length > 0 && (
                        <div id="sugestoes-cpf" className="sugestoes-lista" tabIndex="-1">
                            {sugestoes.map((p, i) => (
                                <div
                                    key={i}
                                    className="sugestao-item"
                                    onClick={() => selecionarSugestao(p)}
                                >
                                    {p.cpf} - {p.nome}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn-pesquisar">Pesquisar</button>
            </form>
        </section>
    );
}