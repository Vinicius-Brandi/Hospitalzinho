export function CadastroDoencaCronica() {
    return (
        <fieldset id="formNovaDoencaCronica">
            <legend>Adicionar Doença Crônica</legend>
            <div className="form-grid">
                
                <div className="form-group full-width">
                    <div className="label-com-botao">
                        <label htmlFor="doencaCronicaPesquisa">Pesquisar Doença</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="doencaCronicaPesquisa" name="doencaCronicaPesquisa" placeholder="Digite o nome ou CID para buscar" />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="doencaCronicaObs">Observações</label>
                    <textarea id="doencaCronicaObs" name="doencaCronicaObs" rows={4}></textarea>
                </div>

            </div>
        </fieldset>
    )
}