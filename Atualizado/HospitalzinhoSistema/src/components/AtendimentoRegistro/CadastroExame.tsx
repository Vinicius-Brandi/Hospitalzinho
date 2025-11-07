import type { ChangeEvent } from "react";
import type { Exame } from "../../../models/prontuario";

export function CadastroExame({
    exame,
    onChange
}: {
    exame: Partial<Exame>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    return (
        <fieldset id="formNovoExame" >
            <legend>Dados do Exame</legend>
            <div className="form-grid">
                <div className="form-group">
                    <div className="label-com-botao">
                        <label htmlFor="tipoExame">Tipo do Exame</label>
                        <button type="button" className="btn-cadastrar-inline">Cadastrar</button>
                    </div>
                    <input type="text" id="tipoExame" name="tipoExame" placeholder="Ex: Hemograma Completo" value={exame.tipoExame} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dataExame">Data do Exame</label>
                    <input type="date" id="dataExame" name="dataExame" value={exame.data} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="hospital">Hospital</label>
                    <input type="text" id="hospital" name="hospital" placeholder="Onde foi realizado o exame" value={exame.hospital} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="laboratorio">Laboratório</label>
                    <input type="text" id="laboratorio" name="laboratorio" placeholder="Onde foi realizado o exame" value={exame.laboratorio} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="profissionalResponsavel">Profissional Responsável</label>
                    <select id="profissionalResponsavel" name="profissionalResponsavel" value={exame.profissionalResponsavel} onChange={onChange}>
                        <option value="" disabled selected>Selecione o profissional</option>
                        <option value="crm123">Dr. João da Silva (CRM 123)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="profissionalRegistro">Profissional Registro</label>
                    <input type="text" id="profissionalRegistro" name="profissionalRegistro" value={exame.profissionalRegistro} onChange={onChange} />
                </div>
                
                <div className="form-group full-width">
                    <label htmlFor="resultados">Resultados</label>
                    <textarea id="resultados" name="resultados" rows={4} value={exame.resultados} onChange={onChange}></textarea>
                </div>
                <div className="form-group full-width">
                    <label htmlFor="observacoes">Observações</label>
                    <textarea id="observacoes" name="observacoes" rows={4} value={exame.observacoes} onChange={onChange}></textarea>
                </div>
            </div>
        </fieldset>
    )
}