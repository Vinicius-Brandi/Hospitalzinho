import { useState, type ChangeEvent } from 'react';
import { Footer } from '../../components/HeaderAndFooter/Footer';
import { Header } from '../../components/HeaderAndFooter/Header';
import InputSugestion from '../../components/InputSugestion';
import { ListaMedicamentos } from '../../components/Medicamentos/ListaMedicamentos';
import './ListaEstoque.css'
import { Modal } from '../../components/Modal';
import { ListaCadastroRegistro } from '../../components/AtendimentoRegistro/ListaCadastroRegistro';
import type { MedicamentoModelo } from '../../../models/prontuario';
import { HOSPITALID, type Medicamento } from '../../../models/hospital';
import { api } from '../../../services/api';

export function ListaEstoque() {
    const [showModal, setShowModal] = useState(false);
    const [medicamento, setMedicamento] = useState<Partial<Medicamento>>({});

    function onChange(valor: ChangeEvent<HTMLInputElement>) {
        const { name, value } = valor.target;
        setMedicamento({ ...medicamento, [name]: value });
    }

    async function salvarMedicamento() {
        try {

            const modeloId = (await api.get(`MedicamentoModelo?$filter=tolower(nome) eq tolower('${medicamento.modeloId}')`)).data[0].id;

            await api.post('/Medicamento', {
                ...medicamento,
                hospitalId: HOSPITALID,
                modeloId: modeloId
            });
        } catch (error) {
            console.error("Erro ao salvar medicamento:", error);
        }
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ListaCadastroRegistro<MedicamentoModelo>
                    tipoDado="MedicamentoModelo"
                    titulo="Lista de Medicamentos"
                    renderItem={(medicamento) => (
                        <>
                            <div className="paciente-info">
                                <h3>{medicamento.nome}</h3>
                            </div>
                        </>
                    )}
                />
            </Modal>

            <Header />
            <main>

                <section id="cadastro-novo-paciente">
                    <form>
                        <fieldset>
                            <div className="form-group full-width">
                                <label htmlFor="lote">Lote</label>
                                <input type="text" id="lote" name="lote" value={medicamento.lote ?? ""} onChange={onChange} />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="quantidadeDisponivel">Quantidade Disponível</label>
                                <input type="number" id="quantidadeDisponivel" name="quantidadeDisponivel" value={medicamento.quantidadeDisponivel ?? ""} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <div className="label-com-botao">
                                    <label htmlFor="modeloId">Medicamento Modelo</label>
                                    <button onClick={() => setShowModal(true)} type="button" className="btn-cadastrar-inline">Cadastrar</button>
                                </div>
                                <InputSugestion placeholder="Digite o nome do modelo do medicamento" tipoDado="MedicamentoModelo" nameInput="modeloId" setValorTeste={onChange} valorBuscarAPI="nome" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dataFabricacao">Data Fabricação</label>
                                <input
                                    type="date"
                                    id="dataFabricacao"
                                    name="dataFabricacao"
                                    value={medicamento.dataFabricacao ?? ""}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dataValidade">Data Validade</label>
                                <input
                                    type="date"
                                    id="dataValidade"
                                    name="dataValidade"
                                    value={medicamento.dataValidade ?? ""}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="botoes-form">
                                <button type="button" className="btn-salvar" onClick={salvarMedicamento}>Salvar Medicamento</button>
                            </div>
                        </fieldset>
                    </form>
                </section>
                <ListaMedicamentos />
            </main>
            <Footer />
        </>
    )
}