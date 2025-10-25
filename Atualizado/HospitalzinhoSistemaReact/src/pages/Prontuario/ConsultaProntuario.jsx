import './ConsultaPaciente.css'
import { Header } from '../../components/Header_and_Footer/Header';
import { Footer } from '../../components/Header_and_Footer/Footer';
import { CampoBuscarPacienteCPF } from '../../components/Pesquisa/CampoBuscarPacienteCPF';
import { useState } from 'react';

export function ConsultaProntuario(){
    const [paciente, setPaciente] = useState(null);

    async function buscarPaciente(cpf) {
        try {
            const resposta = await fetch(`http://localhost:5139/api/Paciente/BuscarPacientePorCPF/${cpf}`);
            if (!resposta.ok) throw new Error('Paciente não encontrado');
            const dados = await resposta.json();
            setPaciente(dados);
            console.log(dados);
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <>
            <Header />
            <main>
                <h1>Prontuário Eletrônico do Paciente</h1>

                <CampoBuscarPacienteCPF 
                    onSugestaoSelecionada={(s) => buscarPaciente(s)} 
                    onPesquisar={buscarPaciente}
                />

                {paciente &&
                    <div id="resultados-prontuario">

                        <section className="card-prontuario" id="dados-paciente">
                            <div className="card-header">
                                <h2>Dados do Paciente</h2>
                            </div>
                            <div className="card-body info-paciente">
                                <div><strong>Nome:</strong> {paciente.nome} </div>
                                <div><strong>Data de Nasc.:</strong> {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')} </div>
                                <div><strong>CPF:</strong> {paciente.cpf} </div>
                                <div><strong>CNS:</strong> {paciente.cns} </div>
                                <div><strong>Mãe:</strong> {paciente.nomeMae} </div>
                                <div><strong>Telefone:</strong> {paciente.contato.telefoneCelular} </div>
                                <div><strong>Endereço:</strong> {paciente.endereco.logradouro}, {paciente.endereco.numero}, {paciente.endereco.bairro}, {paciente.endereco.cidade} - {paciente.endereco.estado}</div>
                            </div>
                        </section>

                        <section className="card-prontuario" id="alergias">
                            <div className="card-header">
                                <h2>Alergias Conhecidas</h2>
                            </div>
                            <div className="card-body">
                                {paciente.prontuarioAlergia && paciente.prontuarioAlergia.length > 0 ? (
                                    paciente.prontuarioAlergia.map((alergia, index) => (
                                        <p key={index} className="alergia-item">
                                            {alergia.descricaoAlergia}
                                        </p>
                                    ))
                                    ) : (
                                    <p>Nenhuma alergia registrada.</p>
                                )}
                            </div>
                        </section>

                        <section className="card-prontuario" id="vacinacao">
                            <div className="card-header">
                                <h2>Histórico de Vacinação</h2>
                            </div>
                            <div className="card-body table-container">
                                <table>
                                    {paciente.prontuarioVacina && paciente.prontuarioVacina.length > 0 ? (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Vacina</th>
                                                    <th>Dose</th>
                                                    <th>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paciente.prontuarioVacina.map((vacina, index) => (
                                                    <>
                                                        <tr>
                                                            <td key={index}>
                                                                {vacina.nome}
                                                            </td>
                                                            <td key={index}>
                                                                {vacina.dose}
                                                            </td>
                                                            <td key={index}>
                                                                {new Date(vacina.dataAplicacao).toLocaleDateString('pt-BR')}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </> ) : (
                                        <p>Nenhuma vacina registrada.</p>
                                    )}
                                </table>
                            </div>
                        </section>
                        
                        <section className="card-prontuario" id="consultas">
                            <div className="card-header">
                                <h2>Histórico de Consultas</h2>
                            </div>
                            <div className="card-body table-container">
                                <table>
                                    {paciente.prontuarioConsulta && paciente.prontuarioConsulta.length > 0 ? (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Especialidade</th>
                                                    <th>Resumo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paciente.prontuarioConsulta.map((consulta, index) => (
                                                    <>
                                                        <tr>
                                                            <td key={index}>
                                                                {new Date(consulta.dataConsulta).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td key={index}>
                                                                {consulta.especialidade}
                                                            </td>
                                                            <td key={index}>
                                                                {consulta.resumo}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </> ) : (
                                        <p>Nenhuma consulta registrada.</p>
                                    )}
                                </table>
                            </div>
                        </section>

                        <section className="card-prontuario" id="internacoes">
                            <div className="card-header">
                                <h2>Histórico de Internações</h2>
                            </div>
                            <div className="card-body table-container">
                                <table>
                                    {paciente.prontuarioInternacao && paciente.prontuarioInternacao.length > 0 ? (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Entrada</th>
                                                    <th>Saída</th>
                                                    <th>Motivo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paciente.prontuarioInternacao.map((internacao, index) => (
                                                    <>
                                                        <tr>
                                                            <td key={index}>
                                                                {new Date(internacao.dataEntrada).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td key={index}>
                                                                {new Date(internacao.dataSaida).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td key={index}>
                                                                {internacao.motivoInternacao}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </> ) : (
                                        <p>Nenhuma internação registrada.</p>
                                    )}
                                </table>
                            </div>
                        </section>

                        <section className="card-prontuario" id="medicamentos">
                            <div className="card-header">
                                <h2>Medicamentos em Uso / Prescrições Recentes</h2>
                            </div>
                            <div className="card-body table-container"> 
                                <table>
                                    {paciente.prontuarioInternacao && paciente.prontuarioInternacao.length > 0 ? (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Medicamento</th>
                                                    <th>Dosagem</th>
                                                    <th>Início</th>
                                                    <th>Profissional</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paciente.prontuarioMedicamento.map((medicamento, index) => (
                                                    <>
                                                        <tr>
                                                            <td key={index}>
                                                                {new Date(medicamento.dataEntrada).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td key={index}>
                                                                {new Date(medicamento.dataSaida).toLocaleDateString('pt-BR')}
                                                            </td>
                                                            <td key={index}>
                                                                {medicamento.motivomedicamento}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </> ) : (
                                        <p>Nenhum medicamento registrado.</p>
                                    )}
                                </table>
                            </div>
                        </section>
                    </div>
                }
            </main>
            <Footer />
        </>
    );
}