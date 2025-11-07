import type { ChangeEvent } from "react";
import type { Medicacao } from "../../../models/prontuario";

export function CadastroMedicacao({
    medicacao,
    onChange
}: {
    medicacao: Partial<Medicacao>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="formNovaMedicacao">
            <legend>Dados da Medicação</legend>
            <div className="form-grid">

                <div className="form-group">
                    <div className="label-com-botao">
                        <label htmlFor="medicamento">Medicamento</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="medicamento" name="medicamento" placeholder="Ex: Paracetamol" value={medicacao.medicamento} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="dosagemPrescrita">Dosagem Prescrita</label>
                    <input type="text" id="dosagemPrescrita" name="dosagemPrescrita" placeholder="Ex: 500mg, 1 comprimido" value={medicacao.dosagemPrescrita} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="frequenciaMedicacao">Frequência</label>
                    <input type="text" id="frequenciaMedicacao" name="frequenciaMedicacao" placeholder="Ex: 1x ao dia, 8 em 8 horas" value={medicacao.frequenciaMedicacao} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="viaAdministracao">Via de Administração</label>
                    <input type="text" id="viaAdministracao" name="viaAdministracao" placeholder="Ex: Oral, Intravenosa" value={medicacao.viaAdministracao} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="dataInicioMedicacao">Data de Início</label>
                    <input type="date" id="dataInicioMedicacao" name="dataInicioMedicacao" value={medicacao.dataInicioMedicacao} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="dataFinalMedicacao">Data Final</label>
                    <input type="date" id="dataFinalMedicacao" name="dataFinalMedicacao" value={medicacao.dataFinalMedicacao} onChange={onChange} />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="obsMedicacao">Observações</label>
                    <textarea id="obsMedicacao" name="obsMedicacao" rows={4} value={medicacao.obsMedicacao} onChange={onChange}></textarea>
                </div>

            </div>
        </fieldset>
    )
}