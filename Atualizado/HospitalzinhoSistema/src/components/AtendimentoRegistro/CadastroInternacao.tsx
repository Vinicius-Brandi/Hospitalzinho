import type { ChangeEvent } from "react";
import type { Internacao } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";

export function CadastroInternacao({
    internacao,
    onChange
}: {
    internacao: Partial<Internacao>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="form-nova-internacao">
            <legend>Dados da Internação</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="quarto">Quarto</label>
                    <input type="text" id="quarto" name="quarto" value={internacao.quarto} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="hospital">Hospital</label>
                    <input type="text" id="hospital" name="hospital" value={internacao.hospital} onChange={onChange} />
                </div>
                
                <CadastroResponsavel value={internacao.profissionalResponsavel} onChange={onChange} />

                <div className="form-group">
                    <label htmlFor="dataEntrada">Data de Entrada</label>
                    <input type="date" id="dataEntrada" name="dataEntrada" value={internacao.dataEntrada} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dataSaida">Data de Saída</label>
                    <input type="date" id="dataSaida" name="dataSaida" value={internacao.dataSaida} onChange={onChange} />
                </div>
                <div className="form-group full-width">
                    <label htmlFor="profRegistro">Registro do profissional</label>
                    <textarea id="profRegistro" name="profRegistro" rows={4} value={internacao.profRegistro} onChange={onChange}></textarea>
                </div>
            </div>
        </fieldset>
    )
}