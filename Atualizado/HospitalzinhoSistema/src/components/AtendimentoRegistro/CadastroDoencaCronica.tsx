import { useState, type ChangeEvent } from "react";
import type { DoencaCronica, TipoDoencaCronica } from "../../../models/prontuario";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import InputSugestion from "../InputSugestion";

export function CadastroDoencaCronica({
    doencaCronica,
    onChange
}: {
    doencaCronica: Partial<DoencaCronica>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<TipoDoencaCronica>
                    tipoDado="DoencaCronicaModelo"
                    titulo="Lista de tipos de Doença Crônica"
                    renderItem={(doencaCronica) => (
                        <>
                            <div className="paciente-info">
                                <h3>{doencaCronica.nome}</h3>
                                <p>{doencaCronica.descricao}</p>
                            </div>

                        </>
                    )}
                />
            </Modal>

            <fieldset id="formNovaDoencaCronica">
                <legend>Adicionar Doença Crônica</legend>
                <div className="form-grid">

                    <div className="form-group full-width">
                        <div className="label-com-botao">
                            <label htmlFor="doencaCronicaPesquisa">Pesquisar Doença</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o nome para buscar" tipoDado="DoencaCronicaModelo"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataDiagnostico">Data do Diagnóstico</label>
                        <input type="date" id="dataDiagnostico" name="dataDiagnostico" value={doencaCronica.dataDiagnostico} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estagio">Estágio</label>
                        <input type="text" id="estagio" name="estagio" value={doencaCronica.estagio} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="emTratamento">Em Tratamento?</label>
                        <select id="emTratamento" name="emTratamento" value={doencaCronica.emTratamento} onChange={onChange}>
                            <option value="" disabled>Selecione</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="doencaCronicaObs">Observações</label>
                        <textarea id="doencaCronicaObs" name="doencaCronicaObs" rows={4} value={doencaCronica.observacoes} onChange={onChange}></textarea>
                    </div>

                </div>
            </fieldset>
        </>
    )
}