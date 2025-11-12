import type { ChangeEvent } from "react";
import type { Consulta } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";

export function CadastroConsulta({
    consulta,
    onChange
}: {
    consulta: Partial<Consulta>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="form-nova-consulta">
            <legend>Dados da Consulta</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        value={consulta.data ?? ""}
                        onChange={onChange}
                    />
                </div>
                
                <CadastroResponsavel value={consulta.profissionalResponsavel ?? ""} onChange={onChange} />

                <div className="form-group">
                    <label htmlFor="hospital">Hospital</label>
                    <input
                        type="text"
                        id="hospital"
                        name="hospital"
                        value={consulta.hospital ?? ""}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sala">Sala</label>
                    <input
                        type="text"
                        id="sala"
                        name="sala"
                        value={consulta.sala ?? ""}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="observacoes">Resumo / Anotações</label>
                    <textarea
                        id="observacoes"
                        name="observacoes"
                        rows={5}
                        value={consulta.observacoes ?? ""}
                        onChange={onChange}
                    />
                </div>
            </div>
        </fieldset>
    );
}
