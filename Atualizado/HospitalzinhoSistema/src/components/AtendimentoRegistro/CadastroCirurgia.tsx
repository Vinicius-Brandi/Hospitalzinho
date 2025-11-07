export function CadastroCirurgia() {
    return (
        <fieldset id="formNovaCirurgia">
            <legend>Dados da Cirurgia</legend>
            <div className="form-grid">

                <div className="form-group">
                    <div className="label-com-botao">
                        <label htmlFor="nomeCirurgia">Nome da Cirurgia</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="nomeCirurgia" name="nomeCirurgia" placeholder="Ex: Apendicectomia" />
                </div>

                <div className="form-group">
                    <label htmlFor="hospitalCirurgia">Hospital</label>
                    <input type="text" id="hospitalCirurgia" name="hospitalCirurgia" placeholder="Nome ou CNES da instituição" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="salaCirurgia">Sala</label>
                    <input type="text" id="salaCirurgia" name="salaCirurgia" placeholder="Ex: Sala 03, Bloco Cirúrgico A" />
                </div>

                <div className="form-group">
                    <label htmlFor="cirurgiaoEncarregado">Cirurgião Encarregado</label>
                    <select id="cirurgiaoEncarregado" name="cirurgiaoEncarregado">
                        <option value="" disabled selected>Selecione o profissional</option>
                        <option value="crm123">Dr. João da Silva (CRM 123)</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="dataCirurgia">Data</label>
                    <input type="date" id="dataCirurgia" name="dataCirurgia" />
                </div>

                <div className="form-group">
                    <label htmlFor="horarioCirurgia">Horário</label>
                    <input type="time" id="horarioCirurgia" name="horarioCirurgia" />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="obsCirurgia">Observações</label>
                    <textarea id="obsCirurgia" name="obsCirurgia" rows={4}></textarea>
                </div>

            </div>
        </fieldset>
    )
}