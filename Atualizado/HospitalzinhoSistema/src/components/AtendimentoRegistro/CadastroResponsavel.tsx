import { useState, type ChangeEvent } from "react";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { ProfissionalResponsavel } from "../../../models/hospital";

export function CadastroResponsavel({ value, onChange }: { value: string | undefined; onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void; }) {
    const [showModal, setShowModal] = useState(false);
    const [profissional, setProfissional] = useState<ProfissionalResponsavel | null>(null);

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
                                <p>{profissional.especialidade}</p>
                            </div>

                        </>
                    )}
                />
            </Modal>

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="profissionalResponsavel">Profissional Responsável</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <select id="profissionalResponsavel" name="profissionalResponsavel" value={value ?? ""} onChange={onChange}>
                    <option value="" disabled>Selecione o profissional</option>
                    <option value="crm123">Dr. João da Silva (CRM 123)</option>
                    <option value="teste">Dr. Teste (CRM 131232132123)</option>
                </select>
            </div>
        </>
    )
}