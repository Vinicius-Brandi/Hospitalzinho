import React, { useState } from "react";
import InputSugestion from "../InputSugestion";
import { api } from "../../../services/api";
import type { Paciente } from "../../../models/paciente";

export function ConsultaPacienteCPF({ onPaciente }: { onPaciente: (paciente: Partial<Paciente> | null) => void }) {
    const [pesquisaCPF, setPesquisaCPF] = useState("");

    function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPesquisaCPF(e.target.value);
    }

    async function buscarPacientePorCPF() {
        if (pesquisaCPF.trim() === "") {
            console.log("Campo de CPF vazio.");
            return;
        }

        try {
            const response = await api.get(
                `/Paciente?$filter=tolower(cpf) eq tolower('${pesquisaCPF}')`
            );

            if (response.data && response.data.length > 0) {
                console.log("Paciente encontrado:", response.data);
                onPaciente(response.data[0]);
            } else {
                console.log("Nenhum paciente encontrado com este CPF.");
                onPaciente(null); 
            }
            
        } catch (error) {
            console.error("Erro ao buscar paciente:", error);
            onPaciente(null);
        }
    }

    return (
        <section id="pesquisa-paciente">
            <h2>Buscar Paciente</h2>
            <form className="form-pesquisa" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                    <InputSugestion 
                        nameInput="cpf" 
                        tipoDado="Paciente" 
                        placeholder="Digite o CPF do paciente" 
                        valorBuscarAPI="cpf" 
                        setValorTeste={handleCPFChange} 
                    />
                </div>
                <button type="button" className="btn-pesquisar" onClick={buscarPacientePorCPF}>Pesquisar</button>
            </form>
        </section>
    );
}