import './PacienteCadastro.css'
import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import { useState } from 'react';
import { CadastroConsulta } from '../../components/AtendimentoRegistro/CadastroConsulta';
import { CadastroVacina } from '../../components/AtendimentoRegistro/CadastroVacina';
import { CadastroInternacao } from '../../components/AtendimentoRegistro/CadastroInternacao';
import { CadastroAlergia } from '../../components/AtendimentoRegistro/CadastroAlergia';
import { CadastroExame } from '../../components/AtendimentoRegistro/CadastroExame';
import { CadastroDoencaCronica } from '../../components/AtendimentoRegistro/CadastroDoencaCronica';
import { CadastroMedicacao } from '../../components/AtendimentoRegistro/CadastroMedicacao';
import { CadastroCirurgia } from '../../components/AtendimentoRegistro/CadastroCirurgia';
import type { Alergia, Cirurgia, Consulta, DoencaCronica, PacienteExame, Internacao, Medicacao, Vacina } from '../../../models/prontuario';
import { api } from '../../../services/api';

export function AtendimentoRegistro() {
    const [tipoCadastro, setTipoCadastro] = useState('consulta');
    const [dado, setDado] = useState<Record<string, any>>({});

    function onChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setDado((prev) => ({
            ...prev,
            [name]: value ?? "",
        }));
    }

    async function HandleSubmit() {
        if (tipoCadastro === 'exame') {
            const novoDado = dado as PacienteExame;

            await api.post('/ProntuarioExame', novoDado);
        }
    }

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
                                        <option value="consulta">Nova Consulta</option>
                                        <option value="vacina">Nova Vacina</option>
                                        <option value="internacao">Nova Internação</option>
                                        <option value="alergia">Nova Alergia</option>
                                        <option value="exame">Novo Exame</option>
                                        <option value="doencaCronica">Nova Doença Crônica</option>
                                        <option value="medicacao">Nova Medicação</option>
                                        <option value="cirurgia">Nova Cirurgia</option>
                                    </select>
                                </div>

                                {tipoCadastro === 'consulta' &&  <CadastroConsulta consulta={dado as Partial<Consulta>} onChange={onChange} />}

                                    {/*{tipoCadastro === 'vacina' && <CadastroVacina vacina={dado as Partial<Vacina>} onChange={onChange} />}

                                    {tipoCadastro === 'internacao' && <CadastroInternacao internacao={dado as Partial<Internacao>} onChange={onChange} />}

                                    {tipoCadastro === 'alergia' && <CadastroAlergia alergia={dado as Partial<Alergia>} onChange={onChange} />} */}
                                {tipoCadastro === 'exame' && <CadastroExame exame={dado as Partial<PacienteExame>} onChange={onChange} />}

                                {tipoCadastro === 'doencaCronica' && <CadastroDoencaCronica doencaCronica={dado as Partial<DoencaCronica>} onChange={onChange} />}

                                {tipoCadastro === 'medicacao' && <CadastroMedicacao medicacao={dado as Partial<Medicacao>} onChange={onChange} />}

                                    {/* {tipoCadastro === 'cirurgia' && <CadastroCirurgia cirurgia={dado as Partial<Cirurgia>} onChange={onChange} />} */}

                                <button type="button" className="btn-salvar" onClick={HandleSubmit}>Salvar Registro</button>
                            </form>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}