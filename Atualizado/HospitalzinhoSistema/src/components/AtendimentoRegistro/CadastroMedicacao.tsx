export function CadastroMedicacao() {
    return (
        <fieldset id="formNovaMedicacao">
            <legend>Dados da Medicação</legend>
            <div className="form-grid">

                <div className="form-group">
                    <div className="label-com-botao">
                        <label htmlFor="medicamento">Medicamento</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="medicamento" name="medicamento" placeholder="Ex: Paracetamol" /> 
                </div>

                <div className="form-group">
                    <label htmlFor="dosagemPrescrita">Dosagem Prescrita</label>
                    <input type="text" id="dosagemPrescrita" name="dosagemPrescrita" placeholder="Ex: 500mg, 1 comprimido" />
                </div>

                <div className="form-group">
                    <label htmlFor="frequenciaMedicacao">Frequência</label>
                    <input type="text" id="frequenciaMedicacao" name="frequenciaMedicacao" placeholder="Ex: 1x ao dia, 8 em 8 horas" />
                </div>

                <div className="form-group">
                    <label htmlFor="viaAdministracao">Via de Administração</label>
                    <input type="text" id="viaAdministracao" name="viaAdministracao" placeholder="Ex: Oral, Intravenosa" />
                </div>

                <div className="form-group">
                    <label htmlFor="dataInicioMedicacao">Data de Início</label>
                    <input type="date" id="dataInicioMedicacao" name="dataInicioMedicacao" />
                </div>

                <div className="form-group">
                    <label htmlFor="dataFinalMedicacao">Data Final</label>
                    <input type="date" id="dataFinalMedicacao" name="dataFinalMedicacao" />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="obsMedicacao">Observações</label>
                    <textarea id="obsMedicacao" name="obsMedicacao" rows={4}></textarea>
                </div>

            </div>
        </fieldset>
    )
}