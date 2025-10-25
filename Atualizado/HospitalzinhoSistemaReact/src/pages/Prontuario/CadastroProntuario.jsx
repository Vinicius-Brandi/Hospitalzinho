import './CadastroProntuario.css'
import { Header } from '../../components/Header_and_Footer/Header';
import { Footer } from '../../components/Header_and_Footer/Footer'; 
import { CampoBuscarPacienteCPF } from '../../components/Pesquisa/CampoBuscarPacienteCPF';
import { useState } from 'react';

export function CadastroProntuario(){
    const [tipoCadastro, setTipoCadastro] = useState('consulta');
    const [paciente, setPaciente] = useState(null);

    async function buscarPaciente(cpf) {
        try {
            const resposta = await fetch(`http://localhost:5139/api/Paciente/BuscarPacientePorCPF/${cpf}`);
            if (!resposta.ok) throw new Error('Paciente não encontrado');
            const dados = await resposta.json();
            setPaciente(dados);
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <>
            <Header />
            <main>
                <h1>Registro de Atendimento e Prontuário</h1>
                <CampoBuscarPacienteCPF 
                    onSugestaoSelecionada={(s) => setPaciente(s)} 
                    onPesquisar={buscarPaciente}
                />


                {paciente != null && (
                    <>
                        <div id="area-de-trabalho">
                            <div id="paciente-encontrado">
                                <section className="card-prontuario" id="dados-paciente">
                                    <div className="card-header">
                                        <h2>Paciente Localizado</h2>
                                    </div>
                                    <div className="card-body info-paciente">
                                        <div><strong>Nome:</strong> {paciente.nome} </div>
                                        <div><strong>Data de Nasc.:</strong> {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')} </div>
                                        <div><strong>CPF:</strong> {paciente.cpf} </div>
                                    </div>
                                </section>

                                <section id="adicionar-registro">
                                    <h2>Adicionar Nova Informação</h2>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="tipo-registro">Selecione o tipo de registro</label>
                                            <select id="tipo-registro" name="tipo-registro" value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value)}>
                                                <option value="consulta">Nova Consulta</option>
                                                <option value="vacina">Nova Vacina</option>
                                                <option value="internacao">Nova Internação</option>
                                                <option value="alergia">Nova Alergia</option>
                                            </select>
                                        </div>
                                        
                                        {tipoCadastro === 'consulta' && (
                                            <fieldset id="form-nova-consulta">
                                                <legend>Dados da Consulta</legend>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label htmlFor="data-consulta">Data</label>
                                                        <input type="date" id="data-consulta" name="data-consulta" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="especialidade">Especialidade</label>
                                                        <input type="text" id="especialidade" name="especialidade" />
                                                    </div>
                                                    <div className="form-group full-width">
                                                        <label htmlFor="resumo-consulta">Resumo / Anotações</label>
                                                        <textarea id="resumo-consulta" name="resumo-consulta" rows="5"></textarea>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )}

                                        {tipoCadastro === 'vacina' && (
                                            <fieldset id="form-nova-vacina">
                                                <legend>Dados da Vacina</legend>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label htmlFor="nome-vacina">Nome da Vacina</label>
                                                        <input type="text" id="nome-vacina" name="nome-vacina" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dose-vacina">Dose</label>
                                                        <input type="text" id="dose-vacina" name="dose-vacina" placeholder="Ex: 1ª Dose, Dose Única" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="data-vacina">Data de Aplicação</label>
                                                        <input type="date" id="data-vacina" name="data-vacina" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )}

                                        {tipoCadastro === 'internacao' && (
                                            <fieldset id="form-nova-internacao">
                                                <legend>Dados da Internação</legend>
                                                <div className="form-grid">
                                                    <div className="form-group">
                                                        <label htmlFor="data-entrada-internacao">Data de Entrada</label>
                                                        <input type="date" id="data-entrada-internacao" name="data-entrada-internacao" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="data-saida-internacao">Data de Saída</label>
                                                        <input type="date" id="data-saida-internacao" name="data-saida-internacao" />
                                                    </div>
                                                    <div className="form-group full-width">
                                                        <label htmlFor="hospital-internacao">Hospital</label>
                                                        <input type="text" id="hospital-internacao" name="hospital-internacao" />
                                                    </div>
                                                    <div className="form-group full-width">
                                                        <label htmlFor="motivo-internacao">Motivo da Internação</label>
                                                        <textarea id="motivo-internacao" name="motivo-internacao" rows="4"></textarea>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )}

                                        {tipoCadastro === 'alergia' && (
                                            <fieldset id="form-nova-alergia">
                                                <legend>Dados da Alergia</legend>
                                                <div className="form-grid">
                                                    <div className="form-group full-width">
                                                        <label htmlFor="descricao-alergia">Descrição da Alergia</label>
                                                        <input type="text" id="descricao-alergia" name="descricao-alergia" placeholder="Ex: Penicilina, Frutos do mar" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        )}

                                        <button type="submit" className="btn-salvar">Salvar Registro</button>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </> )}
            </main>
            <Footer />
        </>
    );
}