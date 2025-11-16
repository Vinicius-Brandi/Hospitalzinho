import { useState, type ChangeEvent } from "react";
import type { Vacina, Vacinacao } from "../../../models/prontuario";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import InputSugestion from "../InputSugestion";

export function CadastroVacinacao({
    vacina,
    onChange
}: {
    vacina: Partial<Vacinacao>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Vacina>
                    tipoDado="Vacina"
                    titulo="Lista de Vacinas"
                    renderItem={(vacina) => (
                        <>
                            <div className="paciente-info">
                                <h3>{vacina.lote}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <fieldset id="form-nova-vacina">
                <legend>Dados da Vacina</legend>
                <div className="form-grid">
                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="vacinaId">Digite o Lote da Vacina</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o Lote da Vacina" tipoDado="Vacina" nameInput="vacinaId" setValorTeste={onChange} valorBuscarAPI="lote" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vacinaId">Nome da Vacina</label>
                        <input type="text" id="vacinaId" name="vacinaId" value={vacina.vacinaId ?? ""} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="doseNumero">Dose</label>
                        <input type="text" id="doseNumero" name="doseNumero" placeholder="Ex: 1ª Dose, Dose Única" value={vacina.doseNumero ?? ""} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataAplicacao">Data de Aplicação</label>
                        <input type="date" id="dataAplicacao" name="dataAplicacao" value={vacina.dataAplicacao ?? ""} onChange={onChange} />
                    </div>
                </div>
            </fieldset>
        </>
    )
}