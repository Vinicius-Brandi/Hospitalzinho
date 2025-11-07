import { Footer } from "../../components/HeaderAndFooter/Footer";
import { Header } from "../../components/HeaderAndFooter/Header";

export function AtendimentoConsulta() {
    return (
        <>
            <Header />
            <main>
                <h1>Prontuário Eletrônico do Paciente</h1>

                <section id="pesquisa-paciente">
                    <h2>Buscar Paciente</h2>
                    <form className="form-pesquisa">
                        <div className="form-group">
                            <label htmlFor="cpf-paciente">CPF ou Cartão Nacional de Saúde (CNS)</label>
                            <input type="text" id="cpf-paciente" name="cpf-paciente" placeholder="Digite o CPF ou CNS do paciente" required />
                        </div>
                        <button type="submit" className="btn-pesquisar">Pesquisar</button>
                    </form>
                </section>

                <div className="botoes-acao">
                    <button type="button" className="btn-adicionar-novo">Adicionar Registro ao Paciente</button>
                </div>

                <div id="prontuario-detalhes"> <section className="card-prontuario" id="dados-paciente">
                        <div className="card-header">
                            <h2>Dados Pessoais</h2>
                        </div>
                        <div className="card-body info-paciente">
                            <div><strong>Nome:</strong> Ana Maria da Silva</div>
                            <div><strong>Data de Nasc.:</strong> 15/08/1985</div>
                            <div><strong>CPF:</strong> 123.456.789-00</div>
                            <div><strong>CNS:</strong> 987.654.321.000</div>
                            <div><strong>Telefone:</strong> (11) 98765-4321</div>
                            <div><strong>Endereço:</strong> Rua das Flores, 123, São Paulo/SP</div>
                        </div>
                    </section>

                    <section className="card-prontuario" id="alergias">
                        <div className="card-header">
                            <h2>Alergias Conhecidas</h2>
                        </div>
                        <div className="card-body">
                            <ul className="lista-itens">
                                <li><strong>Medicamentosa:</strong> Penicilina</li>
                                <li><strong>Alimentar:</strong> Frutos do mar</li>
                            </ul>
                        </div>
                    </section>

                    <section className="card-prontuario" id="vacinas">
                        <div className="card-header">
                            <h2>Vacinas Recebidas</h2>
                        </div>
                        <div className="card-body table-container"> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Vacina</th>
                                        <th>Dose</th>
                                        <th>Data de Aplicação</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>COVID-19 (Pfizer)</td>
                                        <td>Dose de Reforço</td>
                                        <td>10/03/2023</td>
                                    </tr>
                                    <tr>
                                        <td>Gripe (Influenza)</td>
                                        <td>Dose Única</td>
                                        <td>15/04/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    <section className="card-prontuario" id="internacoes">
                        <div className="card-header">
                            <h2>Histórico de Internações</h2>
                        </div>
                        <div className="card-body table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data Entrada</th>
                                        <th>Data Saída</th>
                                        <th>Hospital</th>
                                        <th>Motivo</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>01/02/2022</td>
                                        <td>05/02/2022</td>
                                        <td>Hospital Santa Casa</td>
                                        <td>Apendicite</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="card-prontuario" id="consultas">
                        <div className="card-header">
                            <h2>Histórico de Consultas</h2>
                        </div>
                        <div className="card-body table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Especialidade</th>
                                        <th>Resumo</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>15/05/2024</td>
                                        <td>Cardiologia</td>
                                        <td>Consulta de rotina. Pressão arterial controlada.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="card-prontuario" id="medicamentos">
                        <div className="card-header">
                            <h2>Medicamentos em Uso / Prescrições</h2>
                        </div>
                        <div className="card-body table-container"> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Medicamento</th>
                                        <th>Dosagem</th>
                                        <th>Frequência</th>
                                        <th>Via</th>
                                        <th>Início</th>
                                        <th>Término</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>Losartana Potássica</td>
                                        <td>50mg</td>
                                        <td>1x ao dia</td>
                                        <td>Oral</td>
                                        <td>05/04/2023</td>
                                        <td>Contínuo</td>
                                    </tr>
                                    <tr>
                                        <td>Amoxicilina</td>
                                        <td>500mg</td>
                                        <td>8 em 8 horas</td>
                                        <td>Oral</td>
                                        <td>10/10/2024</td>
                                        <td>17/10/2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="card-prontuario" id="exames">
                        <div className="card-header">
                            <h2>Exames Realizados</h2>
                        </div>
                        <div className="card-body table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exame</th>
                                        <th>Data</th>
                                        <th>Instituição (CNES)</th>
                                        <th>Nome da Instituição</th>
                                        <th>Solicitante (CRM)</th>
                                        <th>Nome do Profissional</th>
                                        <th>Resultado (Resumo)</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>Hemograma Completo</td>
                                        <td>12/05/2024</td>
                                        <td>1234567</td>
                                        <td>Clinica Yamada</td>
                                        <td>987654</td>
                                        <td>Dr. Yamada</td>
                                        <td>Leucócitos ligeiramente elevados.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="card-prontuario" id="cirurgias">
                        <div className="card-header">
                            <h2>Histórico de Cirurgias</h2>
                        </div>
                        <div className="card-body table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cirurgia</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                        <th>Hospital</th>
                                        <th>Cirurgião</th>
                                        <th>Observações</th>
                                    </tr>
                                </thead>
                                <tbody> <tr>
                                        <td>Apendicectomia</td>
                                        <td>01/02/2022</td>
                                        <td>14:30</td>
                                        <td>Hospital Santa Casa</td>
                                        <td>Dr. Roberto Alves</td>
                                        <td>Procedimento realizado sem intercorrências.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </>
    )
}