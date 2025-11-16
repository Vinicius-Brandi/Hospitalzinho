import { useState } from "react";
import InputSugestion from "../InputSugestion";
import type { ProfissionalResponsavel } from "../../../models/hospital";
import { CadastroEspecialidade } from "./CadastroEspecialidade";

export default function CadastroProfissional({profissional, onChangeLista} : {profissional: Partial<ProfissionalResponsavel>, onChangeLista: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <CadastroEspecialidade abrirModal={showModal} setCloseModal={() => setShowModal(false)}/>

            <label>Nome</label>
            <input type="text" required name="nome" value={profissional.nome} onChange={onChangeLista} />

            <label>Registro Profissional</label>
            <input type="text" required name="registroProfissional" value={profissional.registroProfissional} onChange={onChangeLista} />

            <div className="form-group">
                <div className="label-com-botao">
                    <label>Especialidade</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Ex: Hemograma Completo" nameInput="especialidadeId" tipoDado="Especialidade" setValorTeste={(e) => onChangeLista(e)} valorBuscarAPI="nome"/>
            </div>
        </>
    )
}