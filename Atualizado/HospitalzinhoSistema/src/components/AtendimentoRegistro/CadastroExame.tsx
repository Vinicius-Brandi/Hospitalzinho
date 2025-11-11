import { useState, type ChangeEvent } from "react";
import type { PacienteExame, TipoExame } from "../../../models/prontuario";
import { Modal } from "../Modal";
import { CadastroResponsavel } from "./CadastroResponsavel";
import { api } from "../../../services/api";

export function CadastroExame({
    exame,
    onChange
}: {
    exame: Partial<PacienteExame>;
    onChange: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [showModal, setShowModal] = useState(false);
    const [tipoExame, setTipoExame] = useState<Partial<TipoExame>>({});

    function handleTipoExameChange(event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setTipoExame(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmitTipoExame() {
        try {
            await api.post("/Exame", tipoExame);
            alert("Tipo de exame cadastrado com sucesso!");
            setTipoExame({});
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao cadastrar tipo de exame:", error);
            alert("Erro ao cadastrar tipo de exame. Tente novamente.");
        }
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h1>Cadastro de Tipo de Exame</h1>

                <label>Nome</label>
                <input type="text" required onChange={handleTipoExameChange} name="nome" value={tipoExame.nome ?? ""} />

                <label>Descrição</label>
                <textarea rows={3} onChange={handleTipoExameChange} name="descricao" value={tipoExame.descricao ?? ""}></textarea>

                <div className="botoes-form">
                    <button type="button" className="btn-editar" onClick={handleSubmitTipoExame}>Salvar</button>
                </div>
            </Modal>

            <fieldset id="formNovoExame" >
                <legend>Dados do Exame</legend>
                <div className="form-grid">
                    <div className="form-group">
                        <div className="label-com-botao">
                            <label htmlFor="tipoExame">Tipo do Exame</label>
                            <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                        </div>
                        <input type="text" id="tipoExame" name="tipoExame" placeholder="Ex: Hemograma Completo" value={exame.tipoExame} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataExame">Data do Exame</label>
                        <input type="date" id="dataExame" name="dataExame" value={exame.data} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hospital">Hospital</label>
                        <input type="text" id="hospital" name="hospital" placeholder="Onde foi realizado o exame" value={exame.hospital} onChange={onChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="laboratorio">Laboratório</label>
                        <input type="text" id="laboratorio" name="laboratorio" placeholder="Onde foi realizado o exame" value={exame.laboratorio} onChange={onChange} />
                    </div>

                    <CadastroResponsavel value={exame.profissionalResponsavel} onChange={onChange} />

                    <div className="form-group">
                        <label htmlFor="profissionalRegistro">Profissional Registro</label>
                        <input type="text" id="profissionalRegistro" name="profissionalRegistro" value={exame.profissionalRegistro} onChange={onChange} />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="resultados">Resultados</label>
                        <textarea id="resultados" name="resultados" rows={4} value={exame.resultados} onChange={onChange}></textarea>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea id="observacoes" name="observacoes" rows={4} value={exame.observacoes} onChange={onChange}></textarea>
                    </div>
                </div>
            </fieldset>
        </>
    )
}