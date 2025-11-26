import { useState, type ChangeEvent } from "react";
import type { Consulta } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";
import InputSugestion from "../InputSugestion";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { Sala } from "../../../models/hospital";

export function CadastroConsulta({
    consulta,
    onChange
}: {
    consulta: Partial<Consulta>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Sala>
                    tipoDado="Sala"
                    titulo="Lista de Salas"
                    renderItem={(sala) => (
                        <>
                            <div className="paciente-info">
                                <h3>{sala.numero}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <fieldset id="form-nova-consulta">
                <legend>Dados da Consulta</legend>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="dataConsulta">Data</label>
                        <input
                            type="date"
                            id="dataConsulta"
                            name="dataConsulta"
                            value={consulta.dataConsulta ?? ""}
                            onChange={onChange}
                        />
                    </div>

                    <CadastroResponsavel value={consulta.ProfResponsavelId ?? ""} onChange={onChange} />

                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="salaId">Sala</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o numero da sala" tipoDado="Sala" nameInput="salaId" setValorTeste={onChange} valorBuscarAPI="numero" />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="observacoes">Resumo / Anotações</label>
                        <textarea
                            id="observacoes"
                            name="observacoes"
                            rows={5}
                            value={consulta.observacoes ?? ""}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </fieldset>
        </>
    );
}
