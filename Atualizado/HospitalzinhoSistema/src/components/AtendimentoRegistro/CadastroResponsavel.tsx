import { useState, type ChangeEvent } from "react";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { ProfissionalResponsavel } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";

export function CadastroResponsavel({ value, onChange }: { value: string | undefined; onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void; }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<ProfissionalResponsavel>
                    tipoDado="ProfissionalSaude"
                    titulo="Lista de Profissionais"
                    renderItem={(profissional) => (
                        <>
                            <div className="paciente-info">
                                <h3>{profissional.nome}</h3>
                            </div>

                        </>
                    )}
                />
            </Modal>

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="ProfResponsavelId">Profissional Responsável</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Digite o nome do profissional" tipoDado="ProfissionalSaude" nameInput="ProfResponsavelId" setValorTeste={onChange} valorBuscarAPI="nome"/>
            </div>
        </>
    )
}