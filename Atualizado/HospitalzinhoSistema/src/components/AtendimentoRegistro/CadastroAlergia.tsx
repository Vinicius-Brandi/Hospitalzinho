import type { ChangeEvent } from "react";
import type { Alergia } from "../../../models/prontuario";

export function CadastroAlergia({
    alergia,
    onChange
}: {
    alergia: Partial<Alergia>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="form-nova-alergia">
            <legend>Dados da Alergia</legend>
            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="tipoAlergia">Tipo da Alergia</label>
                    <select id="tipoAlergia" name="tipoAlergia" value={alergia.alergia} onChange={onChange}>
                        <option value="alimentar" selected>Alimentar</option>
                        <option value="medicamentosa">Medicamentosa</option>
                        <option value="ambiental">Ambiental</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <div className="form-group full-width">
                    <label htmlFor="descricao-alergia">Descrição da Alergia</label>
                    <input type="text" id="descricao-alergia" name="descricao-alergia" placeholder="Ex: Penicilina, Frutos do mar" value={alergia.descricao} onChange={onChange} />
                </div>
            </div>
        </fieldset>
    )
}