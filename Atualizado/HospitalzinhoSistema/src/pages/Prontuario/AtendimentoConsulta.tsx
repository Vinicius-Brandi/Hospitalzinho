import { useEffect, useState } from "react";
import { Footer } from "../../components/HeaderAndFooter/Footer";
import { Header } from "../../components/HeaderAndFooter/Header";
import { ConsultaPacienteCPF } from "../../components/AtendimentoRegistro/ConsultaPacienteCPF";
import { api } from "../../../services/api";
import type { Paciente } from "../../../models/paciente";
import type { Alergia } from "../../../models/prontuario";

function formatDate(dateString: string | undefined) {
    if (!dateString) return "Data não informada";
    try {
        return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    } catch (e) {
        return dateString;
    }
}

export function AtendimentoConsulta() {
    const [paciente, setPaciente] = useState<Partial<any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [alergiasMap, setAlergiasMap] = useState<Map<number, Alergia>>(new Map());

    useEffect(() => {
        async function carregarTiposDeAlergia() {
            try {
                const response = await api.get('/Alergia');
                
                if (response.data && Array.isArray(response.data)) {
                    const map = new Map<number, Alergia>();
                    
                    for (const alergia of response.data) {
                        map.set(alergia.id, alergia);
                    }
                    
                    setAlergiasMap(map);
                }
            } catch (err) {
                console.error("Erro ao carregar lista de alergias:", err);
                setError("Falha ao carregar dados de alergias.");
            }
        }

        carregarTiposDeAlergia();
    }, []);

    async function AtualizarPaciente(pacienteBase: Partial<Paciente> | null) {
        setPaciente(null);
        setError(null);

        if (!pacienteBase || !pacienteBase.cpf) {
            console.error("Busca cancelada: CPF não encontrado ou paciente nulo.");
            return;
        }
        
        setLoading(true);

        try {
            const response = await api.get('/PacienteProntuario', {
                params: {
                    '$filter': `paciente/cpf eq '${pacienteBase.cpf}'`
                }
            });

            if (response.data && response.data.length > 0) {
                const prontuarioCompleto = response.data[0];
                setPaciente({
                    ...pacienteBase,
                    ...prontuarioCompleto
                });
            } else {
                setPaciente(pacienteBase);
                setError("Prontuário não encontrado, exibindo dados básicos do paciente.");
            }

        } catch (err) {
            console.error("Erro ao buscar prontuário:", err);
            setError("Erro ao carregar o prontuário. Exibindo dados básicos.");
            setPaciente(pacienteBase);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header />
            <main>
                <h1>Prontuário Eletrônico do Paciente</h1>

                <ConsultaPacienteCPF onPaciente={AtualizarPaciente} />

                {loading && <div className="loading-message">Carregando prontuário...</div>}
                
                {error && <div className="error-message">{error}</div>}

                {paciente && paciente.nome && (
                    <div id="prontuario-detalhes">
                        
                        <section className="card-prontuario" id="dados-paciente">
                            <div className="card-header">
                                <h2>Dados Pessoais</h2>
                            </div>
                            <div className="card-body info-paciente">
                                <div><strong>Nome:</strong>{paciente.nome}</div>
                                <div><strong>Data de Nasc.:</strong>{formatDate(paciente.dataNascimento)}</div>
                                <div><strong>CPF:</strong>{paciente.cpf}</div>
                                <div><strong>CNS:</strong>{paciente.cns}</div>
                                <div><strong>Telefone Celular:</strong>{paciente.contatos?.[0]?.telefoneCelular ?? "Sem Cadastro"}</div>
                                <div><strong>Email:</strong>{paciente.contatos?.[0]?.email ?? "Sem Cadastro"}</div>
                                <div>
                                    <strong>Endereço:</strong>
                                    {paciente.enderecos?.[0] ?
                                        `${paciente.enderecos[0].logradouro}, ${paciente.enderecos[0].numero}, ${paciente.enderecos[0].cidade}/${paciente.enderecos[0].estado}`
                                        : "Sem Cadastro"
                                    }
                                </div>
                            </div>
                        </section>

                        <section className="card-prontuario" id="alergias">
                            <div className="card-header">
                                <h2>Alergias Conhecidas</h2>
                            </div>
                            <div className="card-body">
                                <ul className="lista-itens">
                                    {paciente.alergias && paciente.alergias.length > 0 ? (
                                        paciente.alergias.map((alergiaRelacao: any) => {
                                            const alergiaId = alergiaRelacao.alergiaId;
                                            
                                            const alergiaDetalhe = alergiasMap.get(alergiaId);
                                            
                                            return (
                                                <li key={alergiaRelacao.id}>
                                                    <strong>
                                                        {alergiaDetalhe ? alergiaDetalhe.nome : `Alergia ID: ${alergiaId}`}
                                                    </strong>
                                                    
                                                    {alergiaDetalhe && (
                                                        <span>
                                                            {Number(alergiaDetalhe.tipo) === 1 ? " (Medicamentosa)" : " (Outro Tipo)"}
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li>Nenhuma alergia registrada.</li>
                                    )}
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
                                            <th>Hospital</th>
                                            <th>Profissional</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.vacinacoes && paciente.vacinacoes.length > 0 ? (
                                            paciente.vacinacoes.map((v: any) => (
                                                <tr key={v.id}>
                                                    <td>{v.vacina}</td>
                                                    <td>{v.doseNumero}</td>
                                                    <td>{formatDate(v.dataAplicacao)}</td>
                                                    <td>{v.hospital}</td>
                                                    <td>{v.profResponsavel}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>Nenhuma vacina registrada.</td>
                                            </tr>
                                        )}
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
                                            <th>Motivo (Adapte)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.internacoes && paciente.internacoes.length > 0 ? (
                                            paciente.internacoes.map((i: any) => (
                                                <tr key={i.id}>
                                                    <td>{formatDate(i.dataEntrada)}</td>
                                                    <td>{formatDate(i.dataSaida)}</td>
                                                    <td>{i.hospital}</td>
                                                    <td>{i.motivo}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhuma internação registrada.</td>
                                            </tr>
                                        )}
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
                                            <th>Profissional</th>
                                            <th>Hospital</th>
                                            <th>Observações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.consultas && paciente.consultas.length > 0 ? (
                                            paciente.consultas.map((c: any) => (
                                                <tr key={c.id}>
                                                    <td>{formatDate(c.criadoEm)}</td>
                                                    <td>{c.profResponsavel} ({c.profRegistro})</td>
                                                    <td>{c.hospital}</td>
                                                    <td>{c.observacoes}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhuma consulta registrada.</td>
                                            </tr>
                                        )}
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
                                            <th>Via</th>
                                            <th>Princípio Ativo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.medicacoesContinuas && paciente.medicacoesContinuas.length > 0 ? (
                                            paciente.medicacoesContinuas.map((m: any) => (
                                                <tr key={m.id}>
                                                    <td>{m.modelo.nome}</td>
                                                    <td>{m.dosagemPrescrita}</td>
                                                    <td>{m.viaAdministracao}</td>
                                                    <td>{m.modelo.principioAtivo}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhum medicamento contínuo registrado.</td>
                                            </tr>
                                        )}
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
                                            <th>Profissional</th>
                                            <th>Hospital</th>
                                            <th>Resultados</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.exames && paciente.exames.length > 0 ? (
                                            paciente.exames.map((e: any) => (
                                                <tr key={e.id}>
                                                    <td>{e.tipoExame.nome}</td>
                                                    <td>{formatDate(e.criadoEm)}</td>
                                                    <td>{e.profResponsavel} ({e.profRegistro})</td>
                                                    <td>{e.hospital}</td>
                                                    <td>{e.resultados}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>Nenhum exame registrado.</td>
                                            </tr>
                                        )}
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
                                            <th>Cirurgião</th>
                                            <th>Hospital</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paciente.cirurgias && paciente.cirurgias.length > 0 ? (
                                            paciente.cirurgias.map((c: any) => (
                                                <tr key={c.id}>
                                                    <td>{c.nome}</td>
                                                    <td>{formatDate(c.criadoEm)}</td>
                                                    <td>{c.profResponsavel} ({c.profRegistro})</td>
                                                    <td>{c.hospital}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4}>Nenhuma cirurgia registrada.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}