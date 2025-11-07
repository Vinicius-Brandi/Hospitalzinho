export function CadastroExame() {
    return (
        <fieldset id="formNovoExame" >
            <legend>Dados do Exame</legend>
            <div className="form-grid">
                <div className="form-group">
                    <div className="label-com-botao">
                        <label htmlFor="tipoExame">Tipo do Exame</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="tipoExame" name="tipoExame" placeholder="Ex: Hemograma Completo" />
                </div>
                <div className="form-group">
                    <label htmlFor="dataExame">Data do Exame</label>
                    <input type="date" id="dataExame" name="dataExame" />
                </div>

                <div className="form-group">
                    <label htmlFor="cnesExame">CNES da Instituição</label>
                    <input type="text" id="cnesExame" name="cnesExame" placeholder="Onde foi realizado o exame" />
                </div>

                <div className="form-group">
                    <label htmlFor="crmProfissionalExame">CRM do Profissional</label>
                    <input type="text" id="crmProfissionalExame" name="crmProfissionalExame" />
                </div>
                
                <div className="form-group full-width">
                    <label htmlFor="resultadosExame">Resultados</label>
                    <textarea id="resultadosExame" name="resultadosExame" rows={4}></textarea>
                </div>
                <div className="form-group full-width">
                    <label htmlFor="obsExame">Observações</label>
                    <textarea id="obsExame" name="obsExame" rows={4}></textarea>
                </div>
            </div>
        </fieldset>
    )
}