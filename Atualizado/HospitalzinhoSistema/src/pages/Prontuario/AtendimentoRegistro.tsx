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
import type { Alergia, Cirurgia, Consulta, DoencaCronica, Exame, Internacao, Medicacao, Vacina } from '../../../models/prontuario';

export function AtendimentoRegistro() {
    const [tipoCadastro, setTipoCadastro] = useState<TipoCadastro>('consulta');
    const [dados, setDados] = useState({
        consulta: {} as Partial<Consulta>,
        vacina: {} as Partial<Vacina>,
        internacao: {} as Partial<Internacao>,
        alergia: {} as Partial<Alergia>,
        exame: {} as Partial<Exame>,
        doencaCronica: {} as Partial<DoencaCronica>,
        medicacao: {} as Partial<Medicacao>,
        cirurgia: {} as Partial<Cirurgia>
    });

    type TipoCadastro = keyof typeof dados;

    function handleChange(
        tipo: TipoCadastro,
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) {
        const { name, value } = event.target;
        setDados(prev => ({
            ...prev,
            [tipo]: {
            ...prev[tipo],
            [name]: value
            }
        }));
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
                                        <select id="tipo-registro" name="tipo-registro" onChange={(e) => setTipoCadastro(e.target.value as TipoCadastro)}>
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

                                    {tipoCadastro === 'consulta' &&  <CadastroConsulta consulta={dados.consulta} onChange={(e) => handleChange('consulta', e)} />}

                                    {tipoCadastro === 'vacina' && <CadastroVacina vacina={dados.vacina} onChange={(e) => handleChange('vacina', e)} />}

                                    {tipoCadastro === 'internacao' && <CadastroInternacao internacao={dados.internacao} onChange={(e) => handleChange('internacao', e)} />}

                                    {tipoCadastro === 'alergia' && <CadastroAlergia alergia={dados.alergia} onChange={(e) => handleChange('alergia', e)} />}

                                    {tipoCadastro === 'exame' && <CadastroExame exame={dados.exame} onChange={(e) => handleChange('exame', e)} />}

                                    {tipoCadastro === 'doencaCronica' && <CadastroDoencaCronica doencaCronica={dados.doencaCronica} onChange={(e) => handleChange('doencaCronica', e)} />}

                                    {tipoCadastro === 'medicacao' && <CadastroMedicacao medicacao={dados.medicacao} onChange={(e) => handleChange('medicacao', e)} />}

                                    {tipoCadastro === 'cirurgia' && <CadastroCirurgia cirurgia={dados.cirurgia} onChange={(e) => handleChange('cirurgia', e)} />}

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