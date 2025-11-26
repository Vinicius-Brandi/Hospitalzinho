import { useState, type ChangeEvent } from "react";
import type { Leito, Quarto } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";

export function CadastroLeito({
    leito,
    onChangeLista
}: { leito: Partial<Leito>, onChangeLista: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Quarto>
                    tipoDado="Quarto"
                    titulo="Lista de Quartos"
                    renderItem={(quarto) => (
                        <>
                            <div className="paciente-info">
                                <h3>{quarto.numero}</h3>
                            </div>
                        </>
                    )}
                    temHospitalId={true}
                />
            </Modal>



            <label>Número do Leito</label>
            <input type="number" required name="numero" value={leito.numero} onChange={onChangeLista} />

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="quartoId">Numero do Quarto</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Digite o numero do quarto" tipoDado="Quarto" nameInput="quartoId" setValorTeste={onChangeLista} valorBuscarAPI="numero" temHospitalId={true} />
            </div>

            <div className="form-group">
                <label>Ocupado</label>
                <select name="ocupado" value={leito.ocupado ? "true" : "false"} onChange={onChangeLista}>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
            </div>
        </>
    )
}