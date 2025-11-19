import React, { useState } from "react";
import InputSugestion from "../InputSugestion";
import { api } from "../../../services/api";
import type { Paciente } from "../../../models/paciente";

// Definindo as props explicitamente
interface ConsultaPacienteCPFProps {
    paciente: any | null; // O valor (GET)
    setPaciente: React.Dispatch<React.SetStateAction<Paciente | null>>; // A função (SET)
}

export function ConsultaPacienteCPF({ paciente, setPaciente }: ConsultaPacienteCPFProps) {
    const [pesquisaCPF, setPesquisaCPF] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPesquisaCPF(e.target.value);
    }

    // Função auxiliar para buscar dados extras do prontuário
    // Agora ela recebe o pacienteBase como argumento
    async function buscarDadosProntuario(pacienteBase: Paciente) {
        setLoading(true);
        try {
            const response = await api.get('/PacienteProntuario', {
                params: { '$filter': `paciente/cpf eq '${pacienteBase.cpf}'` }
            });

            if (response.data && response.data.length > 0) {
                // Junta os dados do paciente base com o prontuário
                const dadosCompletos = { ...pacienteBase, ...response.data[0] };
                setPaciente(dadosCompletos); // Atualiza o estado no PAI
            } else {
                setPaciente(pacienteBase); // Atualiza o estado no PAI só com o básico
                setError("Prontuário não encontrado, exibindo dados básicos.");
            }
        } catch (err) {
            console.error("Erro ao buscar prontuário:", err);
            setPaciente(pacienteBase);
        } finally {
            setLoading(false);
        }
    }

    async function buscarPacientePorCPF() {
        if (pesquisaCPF.trim() === "") return;
        
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(
                `/Paciente?$filter=tolower(cpf) eq tolower('${pesquisaCPF}')`
            );

            if (response.data && response.data.length > 0) {
                const pacienteEncontrado = response.data[0];
                // Chama a segunda função para enriquecer os dados
                await buscarDadosProntuario(pacienteEncontrado); 
            } else {
                console.log("Nenhum paciente encontrado.");
                setPaciente(null); // Limpa o estado no pai
                setError("Paciente não encontrado.");
                setLoading(false);
            }
            
        } catch (error) {
            console.error("Erro ao buscar paciente:", error);
            setPaciente(null);
            setError("Erro na comunicação com o servidor.");
            setLoading(false);
        }
    }

    return (
        <section id="pesquisa-paciente">
            <h2>Buscar Paciente</h2>
            {/* Exibindo feedback visual */}
            {loading && <p>Carregando...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form className="form-pesquisa" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="cpf-paciente">CPF ou CNS</label>
                    <InputSugestion 
                        nameInput="cpf" 
                        tipoDado="Paciente" 
                        placeholder="Digite o CPF" 
                        valorBuscarAPI="cpf" 
                        setValorTeste={handleCPFChange} 
                    />
                </div>
                <button 
                    type="button" 
                    className="btn-pesquisar" 
                    onClick={buscarPacientePorCPF}
                    disabled={loading}
                >
                    Pesquisar
                </button>
            </form>
        </section>
    );
}