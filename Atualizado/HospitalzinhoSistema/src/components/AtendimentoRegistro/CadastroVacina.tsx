export function CadastroVacina() {
    return (
        <fieldset id="form-nova-vacina">
            <legend>Dados da Vacina</legend>
            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="nome-vacina">Nome da Vacina</label>
                    <input type="text" id="nome-vacina" name="nome-vacina" />
                </div>
                <div className="form-group">
                    <label htmlFor="dose-vacina">Dose</label>
                    <input type="text" id="dose-vacina" name="dose-vacina" placeholder="Ex: 1ª Dose, Dose Única" />
                </div>
                <div className="form-group">
                    <label htmlFor="data-vacina">Data de Aplicação</label>
                    <input type="date" id="data-vacina" name="data-vacina" />
                </div>
            </div>
        </fieldset>
    )
}