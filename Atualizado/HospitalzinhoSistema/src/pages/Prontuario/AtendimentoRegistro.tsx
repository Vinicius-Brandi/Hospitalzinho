import './PacienteCadastro.css'
import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import { useEffect, useState } from 'react';
import { CadastroConsulta } from '../../components/AtendimentoRegistro/CadastroConsulta';
import { CadastroVacina } from '../../components/AtendimentoRegistro/CadastroVacina';
import { CadastroInternacao } from '../../components/AtendimentoRegistro/CadastroInternacao';
import { CadastroAlergia } from '../../components/AtendimentoRegistro/CadastroAlergia';
import { CadastroExame } from '../../components/AtendimentoRegistro/CadastroExame';
import { CadastroDoencaCronica } from '../../components/AtendimentoRegistro/CadastroDoencaCronica';
import { CadastroMedicacao } from '../../components/AtendimentoRegistro/CadastroMedicacao';
import { CadastroCirurgia } from '../../components/AtendimentoRegistro/CadastroCirurgia';
import type { Alergia, Cirurgia, Consulta, DoencaCronica, PacienteExame, Internacao, Medicacao, Vacina, MapTiposCadastro } from '../../../models/prontuario';
import { api } from '../../../services/api';
import { HOSPITALID } from '../../../models/hospital';

export function AtendimentoRegistro() {
    const [tipoCadastro, setTipoCadastro] = useState<keyof MapTiposCadastro>('Consulta');
    const [dado, setDado] = useState<Record<string, any>>({});

    function onChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setDado(prev => {
            const novo = { ...prev };

            if (value === "" || value === null) {
                delete novo[name];
            } else {
                novo[name] = value;
            }

            return novo;
        });
    }

    useEffect(() => {
        setDado({});
    }, [tipoCadastro]);

    async function HandleSubmit() {
        const novoDado: MapTiposCadastro[typeof tipoCadastro] = dado as MapTiposCadastro[typeof tipoCadastro];

        console.log(novoDado);

        if ("hospital" in novoDado) {
            novoDado.hospital = HOSPITALID;
        }

        await api.post(`/Paciente${tipoCadastro}`, novoDado);
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
                                    <select id="tipo-registro" name="tipo-registro" onChange={(e) => setTipoCadastro(e.target.value as keyof MapTiposCadastro)}>
                                        <option value="Consulta">Nova Consulta</option>
                                        <option value="Vacina">Nova Vacina</option>
                                        <option value="Internacao">Nova Internação</option>
                                        <option value="Alergia">Nova Alergia</option>
                                        <option value="Exame">Novo Exame</option>
                                        <option value="DoencaCronica">Nova Doença Crônica</option>
                                        <option value="Medicacao">Nova Medicação</option>
                                        <option value="Cirurgia">Nova Cirurgia</option>
                                    </select>
                                </div>

                                {tipoCadastro === 'Consulta' && <CadastroConsulta consulta={dado as Partial<Consulta>} onChange={onChange} />}

                                {tipoCadastro === 'Vacina' && <CadastroVacina vacina={dado as Partial<Vacina>} onChange={onChange} />}

                                {tipoCadastro === 'Internacao' && <CadastroInternacao internacao={dado as Partial<Internacao>} onChange={onChange} />}

                                {tipoCadastro === 'Alergia' && <CadastroAlergia alergia={dado as Partial<Alergia>} onChange={onChange} />}

                                {tipoCadastro === 'Exame' && <CadastroExame exame={dado as Partial<PacienteExame>} onChange={onChange} />}

                                {tipoCadastro === 'DoencaCronica' && <CadastroDoencaCronica doencaCronica={dado as Partial<DoencaCronica>} onChange={onChange} />}

                                {tipoCadastro === 'Medicacao' && <CadastroMedicacao medicacao={dado as Partial<Medicacao>} onChange={onChange} />}

                                {tipoCadastro === 'Cirurgia' && <CadastroCirurgia cirurgia={dado as Partial<Cirurgia>} onChange={onChange} />}

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