export function CadastroInternacao() {
    return (
        <fieldset id="form-nova-internacao">
            <legend>Dados da Internação</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="data-entrada-internacao">Data de Entrada</label>
                    <input type="date" id="data-entrada-internacao" name="data-entrada-internacao" />
                </div>
                <div className="form-group">
                    <label htmlFor="data-saida-internacao">Data de Saída</label>
                    <input type="date" id="data-saida-internacao" name="data-saida-internacao" />
                </div>
                <div className="form-group full-width">
                    <label htmlFor="hospital-internacao">Hospital</label>
                    <input type="text" id="hospital-internacao" name="hospital-internacao" />
                </div>
                <div className="form-group full-width">
                    <label htmlFor="motivo-internacao">Motivo da Internação</label>
                    <textarea id="motivo-internacao" name="motivo-internacao" rows={4}></textarea>
                </div>
            </div>
        </fieldset>
    )
}