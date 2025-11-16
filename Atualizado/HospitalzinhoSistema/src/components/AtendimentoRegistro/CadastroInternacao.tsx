import { useState, type ChangeEvent } from "react";
import type { Internacao } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { Leito } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";

export function CadastroInternacao({
    internacao,
    onChange
}: {
    internacao: Partial<Internacao>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<Leito>
                    tipoDado="Leito"
                    titulo="Lista de Leitos"
                    renderItem={(leito) => (
                        <>
                            <div className="paciente-info">
                                <h3>{leito.numero}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <fieldset id="form-nova-internacao">
                <legend>Dados da Internação</legend>
                <div className="form-grid">
                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="leitoId">Leito</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o numero do leito" tipoDado="leito" nameInput="leitoId" setValorTeste={onChange} valorBuscarAPI="numero" />
                    </div>

                    <CadastroResponsavel value={internacao.ProfResponsavelId} onChange={onChange} />

                    <div className="form-group">
                        <label htmlFor="dataEntrada">Data de Entrada</label>
                        <input type="date" id="dataEntrada" name="dataEntrada" value={internacao.dataEntrada} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataSaida">Data de Saída</label>
                        <input type="date" id="dataSaida" name="dataSaida" value={internacao.dataSaida} onChange={onChange} />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="profRegistro">Registro do profissional</label>
                        <textarea id="profRegistro" name="profRegistro" rows={4} value={internacao.profRegistro} onChange={onChange}></textarea>
                    </div>
                </div>
            </fieldset>
        </>
    )
}