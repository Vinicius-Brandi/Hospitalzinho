export function CadastroConsulta() {
    return (
        <fieldset id="form-nova-consulta">
            <legend>Dados da Consulta</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="data-consulta">Data</label>
                    <input type="date" id="data-consulta" name="data-consulta" />
                </div>
                <div className="form-group">
                    <label htmlFor="especialidade">Especialidade</label>
                    <input type="text" id="especialidade" name="especialidade" />
                </div>
                <div className="form-group full-width">
                    <label htmlFor="resumo-consulta">Resumo / Anotações</label>
                    <textarea id="resumo-consulta" name="resumo-consulta" rows={5}></textarea>
                </div>
            </div>
        </fieldset>
    )
}