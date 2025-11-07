import './PacienteCadastro.css'
import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import { Modal } from '../../components/Modal'
import { useState } from 'react';
import { CadastroConsulta } from '../../components/AtendimentoRegistro/CadastroConsulta';
import { CadastroVacina } from '../../components/AtendimentoRegistro/CadastroVacina';
import { CadastroInternacao } from '../../components/AtendimentoRegistro/CadastroInternacao';
import { CadastroAlergia } from '../../components/AtendimentoRegistro/CadastroAlergia';
import { CadastroExame } from '../../components/AtendimentoRegistro/CadastroExame';
import { CadastroDoencaCronica } from '../../components/AtendimentoRegistro/CadastroDoencaCronica';
import { CadastroMedicacao } from '../../components/AtendimentoRegistro/CadastroMedicacao';
import { CadastroCirurgia } from '../../components/AtendimentoRegistro/CadastroCirurgia';

export function AtendimentoRegistro() {
    const [showModal, setShowModal] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState('consulta');

    return (
        <>
            <Header />
                <main>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <h1>Cadastro de Tipo de Exame</h1>

                        <form className="formulario">
                            <label>Nome</label>
                            <input type="text" required />

                            <label>Descrição</label>
                            <textarea rows={3}></textarea>

                            <div className="botoes-form">
                                <button type="submit" className="btn-editar">Salvar</button>
                            </div>
                        </form>
                    </Modal>
                    <h1>Registro de Atendimento e Prontuário</h1>

                    <section id="pesquisa-paciente">
                        <h2>Buscar Paciente</h2>
                        <form className="form-pesquisa">
                            <div className="form-group">
                                <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                                <input type="text" id="cpf-paciente" name="cpf-paciente" placeholder="Digite o CPF ou CNS para buscar ou cadastrar" required />
                            </div>
                            <button type="submit" className="btn-pesquisar">Pesquisar</button>
                        </form>
                    </section>

                    <div id="area-de-trabalho">

                        <div id="paciente-encontrado">
                            <section className="card-prontuario" id="dados-paciente">
                                <div className="card-header">
                                    <h2>Paciente Localizado</h2>
                                </div>
                                <div className="card-body info-paciente">
                                    <div><strong>Nome:</strong> Ana Maria da Silva</div>
                                    <div><strong>Data de Nasc.:</strong> 15/08/1985</div>
                                    <div><strong>CPF:</strong> 123.456.789-00</div>
                                </div>
                            </section>

                            <section id="adicionar-registro">
                                <h2>Adicionar Nova Informação</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="tipo-registro">Selecione o tipo de registro</label>
                                        <select id="tipo-registro" name="tipo-registro" onChange={(e) => setTipoCadastro(e.target.value)}>
                                            <option value="consulta" selected>Nova Consulta</option>
                                            <option value="vacina">Nova Vacina</option>
                                            <option value="internacao">Nova Internação</option>
                                            <option value="alergia">Nova Alergia</option>
                                            <option value="exame">Novo Exame</option>
                                            <option value="doencaCronica">Nova Doença Crônica</option>
                                            <option value="medicacao">Nova Medicação</option>
                                            <option value="cirurgia">Nova Cirurgia</option>
                                        </select>
                                    </div>

                                    {tipoCadastro === 'consulta' && <CadastroConsulta />}

                                    {tipoCadastro === 'vacina' && <CadastroVacina />}

                                    {tipoCadastro === 'internacao' && <CadastroInternacao />}
                                    
                                    {tipoCadastro === 'alergia' && <CadastroAlergia />}

                                    {tipoCadastro === 'exame' && <CadastroExame />}
                                    
                                    {tipoCadastro === 'doencaCronica' && <CadastroDoencaCronica />}

                                    {tipoCadastro === 'medicacao' && <CadastroMedicacao />}

                                    {tipoCadastro === 'cirurgia' && <CadastroCirurgia />}

                                    <button type="submit" className="btn-salvar">Salvar Registro</button>
                                </form>
                            </section>
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    )
}