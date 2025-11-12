import { useState } from "react";
import InputSugestion from "../InputSugestion";
import { Modal } from "../Modal";
import { api } from "../../../services/api";
import type { Especialidade, ProfissionalResponsavel } from "../../../models/hospital";

export default function CadastroProfissional({profissional, onChangeLista} : {profissional: Partial<ProfissionalResponsavel>, onChangeLista: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    const [showModal, setShowModal] = useState(false);
    const [especialidade, setEspecialidade] = useState<Partial<Especialidade>>({});

    async function onSubmit() {
        await api.post("/Especialidade", especialidade);
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>){
        setEspecialidade({
            ...especialidade,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <label>Nome</label>
                <input type="text" name="nome" value={especialidade.nome} onChange={onChange} />

                <div className="botoes-form">
                    <button
                        type="button"
                        className="btn-editar"
                        onClick={() => onSubmit()}
                    >
                        Salvar
                    </button>
                </div>
            </Modal>

            <label>Nome</label>
            <input type="text" required name="nome" value={profissional.nome} onChange={onChangeLista} />

            <label>Registro Profissional</label>
            <input type="text" required name="registroProfissional" value={profissional.registroProfissional} onChange={onChangeLista} />

            <div className="form-group">
                <div className="label-com-botao">
                    <label>Especialidade</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Ex: Hemograma Completo" tipoDado="Especialidade" setValorTeste={(e) => onChangeLista(e)}/>
            </div>
        
            <label>Hospital / Unidade</label>
            <input type="text" required name="hospitalUnidadeId" value={profissional.hospitalUnidadeId} onChange={onChangeLista} />
        </>
    )
}