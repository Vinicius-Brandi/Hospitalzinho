import { useState, type ChangeEvent } from "react";
import type { Vacina, VacinaModelo } from "../../../models/prontuario";
import InputSugestion from "../InputSugestion";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";

export function CadastroVacina({
    vacina,
    onChangeLista }: {
        vacina: Partial<Vacina>;
        onChangeLista: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
    }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<VacinaModelo>
                    tipoDado="VacinaModelo"
                    titulo="Lista de Modelos de Vacina"
                    renderItem={(vacinaModelo) => (
                        <>
                            <div className="paciente-info">
                                <h3>{vacinaModelo.nome}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <label>Lote</label>
            <input type="text" required onChange={onChangeLista} name="lote" value={(vacina as any).lote ?? ""} />

            <label htmlFor="dataProducao">Data Produção</label>
            <input
                type="date"
                id="dataProducao"
                name="dataProducao"
                value={(vacina as any).dataProducao ?? ""}
                onChange={onChangeLista}
            />

            <label htmlFor="dataValidade">Data Validade</label>
            <input
                type="date"
                id="dataValidade"
                name="dataValidade"
                value={(vacina as any).dataValidade ?? ""}
                onChange={onChangeLista}
            />

            <label>Quantidade Disponivel</label>
            <input type="text" required onChange={onChangeLista} name="quantidadeDisponivel" value={(vacina as any).quantidadeDisponivel ?? ""} />

            <div className="form-group">
                <div className="label-com-botao">
                    <label htmlFor="vacinaModeloId">Vacina Modelo</label>
                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                </div>
                <InputSugestion placeholder="Digite o nome do Modelo da Vacina" tipoDado="VacinaModelo" nameInput="vacinaModeloId" setValorTeste={onChangeLista} valorBuscarAPI="nome" />
            </div>
        </>
    )
}