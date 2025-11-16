import React, { useState, useEffect } from "react";
import InputSugestion from "../InputSugestion";
import { api } from "../../../services/api";
import type { Paciente } from "../../../models/paciente";

export function ConsultaPacienteCPF({ onPaciente }: { onPaciente: (paciente: Partial<Paciente>) => void }) {
    const [pesquisaCPF, setPesquisaCPF] = useState("");

    function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPesquisaCPF(e.target.value);
    }

    useEffect(() => {
        if (pesquisaCPF.trim() !== "") {
            buscarPacientePorCPF();
        }
    }, [pesquisaCPF]);


    async function buscarPacientePorCPF() {
        try {
            const response = await api.get(
                `/Paciente?$filter=tolower(cpf) eq tolower('${pesquisaCPF}')`
            );

            console.log("Paciente encontrado:", response.data);
            onPaciente(response.data[0]);
        } catch (error) {
            console.error("Erro ao buscar paciente:", error);
        }
    }

    return (
        <section id="pesquisa-paciente">
            <h2>Buscar Paciente</h2>
            <form className="form-pesquisa" autoComplete="off">
                <div className="form-group">
                    <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                    <InputSugestion nameInput="cpf" tipoDado="Paciente" placeholder="Digite o CPF do paciente" valorBuscarAPI="cpf" setValorTeste={handleCPFChange} />
                </div>
                <button type="button" className="btn-pesquisar" onClick={buscarPacientePorCPF}>Pesquisar</button>
            </form>
        </section>
    );
}