import { useState, type ChangeEvent } from "react";
import { Modal } from "../Modal";

export function CadastroResponsavel({ value, onChange }: { value: string | undefined; onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void; }) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h1>Cadastro de Profissional</h1>

                <form className="formulario">
                    <label>Nome</label>
                    <input type="text" required />

                    <label>Registro Profissional</label>
                    <input type="text" required />

                    <label>Especialidade</label>
                    <input type="text" required />

                    <label>Hospital / Unidade</label>
                    <input type="text" required />

                    <div className="botoes-form">
                        <button type="submit" className="btn-editar">Salvar</button>
                    </div>
                </form>
            </Modal>

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="cirurgiaoEncarregado">Profissional Responsável</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <select id="cirurgiaoEncarregado" name="cirurgiaoEncarregado" value={value} onChange={onChange}>
                    <option value="" disabled selected>Selecione o profissional</option>
                    <option value="crm123">Dr. João da Silva (CRM 123)</option>
                </select>
            </div>
        </>
    )
}