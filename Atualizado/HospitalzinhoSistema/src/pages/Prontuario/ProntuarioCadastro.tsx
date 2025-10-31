import './ProntuarioCadastro.css'
import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"

export function ProntuarioCadastro() {
  return (
    <>
        <Header />
            <main>
                <h1>Registro de Atendimento e Prontuário</h1>

                <section id="pesquisa-paciente">
                    <h2>Buscar Paciente</h2>
                    <form className="form-pesquisa">
                        <div className="form-group">
                            <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                            <input type="text" id="cpf-paciente" name="cpf-paciente" placeholder="Digite o CPF ou CNS para buscar ou cadastrar" required/>
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
                                    <select id="tipo-registro" name="tipo-registro">
                                        <option value="consulta" selected>Nova Consulta</option>
                                        <option value="vacina">Nova Vacina</option>
                                        <option value="internacao">Nova Internação</option>
                                        <option value="alergia">Nova Alergia</option>
                                    </select>
                                </div>
                                
                                <fieldset id="form-nova-consulta">
                                    <legend>Dados da Consulta</legend>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="data-consulta">Data</label>
                                            <input type="date" id="data-consulta" name="data-consulta"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="especialidade">Especialidade</label>
                                            <input type="text" id="especialidade" name="especialidade"/>
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="resumo-consulta">Resumo / Anotações</label>
                                            <textarea id="resumo-consulta" name="resumo-consulta" rows={5}></textarea>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset id="form-nova-vacina">
                                    <legend>Dados da Vacina</legend>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="nome-vacina">Nome da Vacina</label>
                                            <input type="text" id="nome-vacina" name="nome-vacina"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dose-vacina">Dose</label>
                                            <input type="text" id="dose-vacina" name="dose-vacina" placeholder="Ex: 1ª Dose, Dose Única"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="data-vacina">Data de Aplicação</label>
                                            <input type="date" id="data-vacina" name="data-vacina"/>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset id="form-nova-internacao">
                                    <legend>Dados da Internação</legend>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="data-entrada-internacao">Data de Entrada</label>
                                            <input type="date" id="data-entrada-internacao" name="data-entrada-internacao"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="data-saida-internacao">Data de Saída</label>
                                            <input type="date" id="data-saida-internacao" name="data-saida-internacao"/>
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="hospital-internacao">Hospital</label>
                                            <input type="text" id="hospital-internacao" name="hospital-internacao"/>
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="motivo-internacao">Motivo da Internação</label>
                                            <textarea id="motivo-internacao" name="motivo-internacao" rows={4}></textarea>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset id="form-nova-alergia">
                                    <legend>Dados da Alergia</legend>
                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label htmlFor="descricao-alergia">Descrição da Alergia</label>
                                            <input type="text" id="descricao-alergia" name="descricao-alergia" placeholder="Ex: Penicilina, Frutos do mar"/>
                                        </div>
                                    </div>
                                </fieldset>

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