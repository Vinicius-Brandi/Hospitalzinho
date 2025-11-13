import { useState } from "react";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { Ala } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";

export function CadastroSala({sala, onChangeLista} : {sala: Partial<Ala>, onChangeLista: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Ala>
                    tipoDado="Ala"
                    titulo="Lista de tipos de Ala"
                    renderItem={(ala) => (
                        <>
                            <div className="paciente-info">
                                <h3>{ala.nome}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <label>Número</label>
            <input type="text" value={(sala as any).numero ?? ""} onChange={onChangeLista} name="numero" />

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="nomeAla">Nome da Ala</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Digite o nome da ala" tipoDado="Ala" nameInput="alaId" setValorTeste={onChangeLista} valorBuscarAPI="nome" />
            </div>

            <label>Tipo</label>
            <select value={(sala as any).tipo ?? ""} onChange={onChangeLista} name="tipo">
                <option value="" disabled>Selecione o tipo</option>
                <option value="1">Consultorio</option>
                <option value="2">Exame</option>
                <option value="3">Procedimento</option>
                <option value="4">Cirurgia</option>
                <option value="5">Internacao</option>
                <option value="6">Emergencia</option>
            </select>

        </>
    )
}