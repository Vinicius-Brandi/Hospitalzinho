import { useState, type ChangeEvent } from "react";
import type { PacienteExame, TipoExame } from "../../../models/prontuario";
import { Modal } from "../Modal";
import { CadastroResponsavel } from "./CadastroResponsavel";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import InputSugestion from "../InputSugestion";

export function CadastroExame({exame, onChange} : {exame : Partial<PacienteExame>, onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<TipoExame>
                    tipoDado="Exame"
                    titulo="Lista de tipos de Exames"
                    renderItem={(exame) => (
                        <>
                            <div className="paciente-info">
                                <h3>{exame.nome}</h3>
                                <p>{exame.descricao}</p>
                            </div>

                        </>
                    )}
                />
            </Modal>

            <fieldset id="formNovoExame" >
                <legend>Dados do Exame</legend>
                <div className="form-grid">
                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="tipoExame">Tipo do Exame</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Ex: Hemograma Completo" tipoDado="Exame"/>
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

                    <CadastroResponsavel value={exame.profissionalResponsavelId} onChange={onChange} />

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
        </>
    )
}