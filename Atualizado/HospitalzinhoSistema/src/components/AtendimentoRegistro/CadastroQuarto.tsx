import { useState, type ChangeEvent } from "react";
import type { Ala, Quarto } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import { Modal } from "../Modal";


export function CadastroQuarto({
    quarto,
    onChangeLista
}: {
    quarto: Partial<Quarto>;
    onChangeLista: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
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
                    temHospitalId={true}
                />
            </Modal>

            <label>Número</label>
            <input type="number" value={(quarto as any).numero ?? ""} onChange={onChangeLista} name="numero" />

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="nomeAla">Nome da Ala</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Digite o nome da ala" tipoDado="Ala" nameInput="alaId" setValorTeste={onChangeLista} valorBuscarAPI="nome" temHospitalId={true}/>
            </div>

            <label>Tipo</label>
            <select value={(quarto as any).tipo ?? ""} onChange={onChangeLista} name="tipo">
                <option value="" disabled>Selecione o tipo</option>
                <option value="1">Enfermaria</option>
                <option value="2">UTI</option>
                <option value="3">Isolamento</option>
                <option value="4">Semi-Intensivo</option>
            </select>

            <label>Capacidade</label>
            <input type="number" value={(quarto as any).capacidade ?? ""} onChange={onChangeLista} name="capacidade" />
        </>
    )
}