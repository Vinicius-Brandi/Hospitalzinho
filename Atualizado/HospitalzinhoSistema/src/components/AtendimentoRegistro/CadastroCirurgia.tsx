import type { ChangeEvent } from "react";
import type { Cirurgia } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";

export function CadastroCirurgia({
    cirurgia,
    onChange
}: {
    cirurgia: Partial<Cirurgia>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="formNovaCirurgia">
            <legend>Dados da Cirurgia</legend>
            <div className="form-grid">

                <div className="form-group">
                    <label htmlFor="nome">Nome da Cirurgia</label>
                    <input type="text" id="nome" name="nome" placeholder="Ex: Apendicectomia" value={cirurgia.nome} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="hospital">Hospital</label>
                    <input type="text" id="hospital" name="hospital" placeholder="Nome ou CNES da instituição" value={cirurgia.hospital} onChange={onChange} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="sala">Sala</label>
                    <input type="text" id="sala" name="sala" placeholder="Ex: Sala 03, Bloco Cirúrgico A" value={cirurgia.sala} onChange={onChange} />
                </div>

                <CadastroResponsavel value={cirurgia.profissionalResponsavel} onChange={onChange} />
                
                <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <input type="date" id="data" name="data" value={cirurgia.data} onChange={onChange} />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="obsCirurgia">Observações</label>
                    <textarea id="obsCirurgia" name="obsCirurgia" rows={4} value={cirurgia.observacoes} onChange={onChange}></textarea>
                </div>

            </div>
        </fieldset>
    )
}