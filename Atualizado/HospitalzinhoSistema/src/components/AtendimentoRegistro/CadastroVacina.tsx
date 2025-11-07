import type { ChangeEvent } from "react";
import type { Vacina } from "../../../models/prontuario";

export function CadastroVacina({
    vacina,
    onChange
}: {
    vacina: Partial<Vacina>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="form-nova-vacina">
            <legend>Dados da Vacina</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="vacina">Nome da Vacina</label>
                    <input type="text" id="vacina" name="vacina" value={vacina.vacina ?? ""} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dose">Dose</label>
                    <input type="text" id="dose" name="dose" placeholder="Ex: 1ª Dose, Dose Única" value={vacina.dose ?? ""} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dataAplicacao">Data de Aplicação</label>
                    <input type="date" id="dataAplicacao" name="dataAplicacao" value={vacina.dataAplicacao ?? ""} onChange={onChange} />
                </div>
            </div>
        </fieldset>
    )
}