import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import '../Prontuario/PacienteCadastro.css';
import './PacienteLista.css';

export function PacienteLista() {
    return (
        <>
            <Header />
            <main>
                <h1>Lista de Pacientes</h1>

                <div className="campo-pesquisa">
                    <input type="text" placeholder="Pesquisar paciente..." />
                        <button>Buscar</button>
                </div>

                <section className="section-lista-pacientes">
                    <div className="lista-pacientes">

                        <div className="paciente-card">
                            <div className="paciente-info">
                                <h3>Mauricio Shigemitsu Kamado Ikeda</h3>
                                <p><strong>CPF:</strong> 123.456.789-00</p>
                                <p><strong>Data de Nascimento:</strong> 23/12/2003</p>
                                <p><strong>Telefone:</strong> (11) 98765-4321</p>
                            </div>
                            <div className="botoes-acoes">
                                <button className="btn-editar">Editar</button>
                                <button className="btn-excluir">Excluir</button>
                            </div>
                        </div>

                        <div className="paciente-card">
                            <div className="paciente-info">
                                <h3>Maria Oliveira</h3>
                                <p><strong>CPF:</strong> 987.654.321-00</p>
                                <p><strong>Data de Nascimento:</strong> 22/07/1992</p>
                                <p><strong>Telefone:</strong> (21) 91234-5678</p>
                            </div>
                            <div className="botoes-acoes">
                                <button className="btn-editar">Editar</button>
                                <button className="btn-excluir">Excluir</button>
                            </div>
                        </div>

                        <div className="paciente-card">
                            <div className="paciente-info">
                                <h3>Carlos Mendes</h3>
                                <p><strong>CPF:</strong> 111.222.333-44</p>
                                <p><strong>Data de Nascimento:</strong> 03/11/1978</p>
                                <p><strong>Telefone:</strong> (31) 99876-5432</p>
                            </div>
                            <div className="botoes-acoes">
                                <button className="btn-editar">Editar</button>
                                <button className="btn-excluir">Excluir</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}