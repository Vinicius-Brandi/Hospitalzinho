import { useState, type ChangeEvent } from "react";
import type { Cirurgia } from "../../../models/prontuario";
import { CadastroResponsavel } from "./CadastroResponsavel";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import { Modal } from "../Modal";
import type { Sala } from "../../../models/hospital";
import InputSugestion from "../InputSugestion";

export function CadastroCirurgia({
    cirurgia,
    onChange
}: {
    cirurgia: Partial<Cirurgia>;
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
                    temHospitalId={true}
                />
            </Modal>

            <fieldset id="formNovaCirurgia">
                <legend>Dados da Cirurgia</legend>
                <div className="form-grid">

                    <div className="form-group">
                        <label htmlFor="nome">Nome da Cirurgia</label>
                        <input type="text" id="nome" name="nome" placeholder="Ex: Apendicectomia" value={cirurgia.nome} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="salaId">Sala</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <InputSugestion placeholder="Digite o numero da sala" tipoDado="Sala" nameInput="salaId" setValorTeste={onChange} valorBuscarAPI="numero" temHospitalId={true}/>
                    </div>

                    <CadastroResponsavel value={cirurgia.profResponsavelId} onChange={onChange} />

                    <div className="form-group">
                        <label htmlFor="dataCirurgia">Data</label>
                        <input type="date" id="dataCirurgia" name="dataCirurgia" value={cirurgia.dataCirurgia} onChange={onChange} />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="obsCirurgia">Observações</label>
                        <textarea id="obsCirurgia" name="obsCirurgia" rows={4} value={cirurgia.observacoes} onChange={onChange}></textarea>
                    </div>

                </div>
            </fieldset>
        </>

    )
}