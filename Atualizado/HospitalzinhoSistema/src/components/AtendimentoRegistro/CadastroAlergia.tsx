import { useState, type ChangeEvent } from "react";
import type { Alergia, PacienteAlergia } from "../../../models/prontuario";
import InputSugestion from "../InputSugestion";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";

export function CadastroAlergia({
    alergia,
    onChange
}: {
    alergia: Partial<PacienteAlergia>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Alergia>
                    tipoDado="Alergia"
                    titulo="Lista de Alergia"
                    renderItem={(tipoAlergia) => (
                        <>
                            <div className="paciente-info">
                                <h3>{tipoAlergia.nome}</h3>
                            </div>

                        </>
                    )}
                />
            </Modal>

            <fieldset id="form-nova-alergia">
                <legend>Dados da Alergia</legend>
                <div className="form-grid">
                    <div className="form-group full-width">
                        <div className="label-com-botao">
                            <label htmlFor="alergiaId">Alergia</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o nome para buscar" tipoDado="Alergia" nameInput="alergiaId" setValorTeste={onChange} valorBuscarAPI="nome" />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="descricao-alergia">Descrição da Alergia</label>
                        <input type="text" id="descricao-alergia" name="descricao-alergia" placeholder="Ex: Penicilina, Frutos do mar" value={alergia.observacaoes} onChange={onChange} />
                    </div>
                </div>
            </fieldset>
        </>
    )
}