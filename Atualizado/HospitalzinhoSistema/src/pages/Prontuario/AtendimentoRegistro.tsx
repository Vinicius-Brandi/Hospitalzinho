import './PacienteCadastro.css'
import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import { useEffect, useState } from 'react';
import { CadastroConsulta } from '../../components/AtendimentoRegistro/CadastroConsulta';
import { CadastroVacinacao } from '../../components/AtendimentoRegistro/CadastroVacinacao';
import { CadastroInternacao } from '../../components/AtendimentoRegistro/CadastroInternacao';
import { CadastroAlergia } from '../../components/AtendimentoRegistro/CadastroAlergia';
import { CadastroExame } from '../../components/AtendimentoRegistro/CadastroExame';
import { CadastroDoencaCronica } from '../../components/AtendimentoRegistro/CadastroDoencaCronica';
import { CadastroMedicacao } from '../../components/AtendimentoRegistro/CadastroMedicacao';
import { CadastroCirurgia } from '../../components/AtendimentoRegistro/CadastroCirurgia';
import type { PacienteAlergia, Cirurgia, Consulta, DoencaCronica, PacienteExame, Internacao, Medicacao, Vacinacao, MapTiposCadastro } from '../../../models/prontuario';
import { api } from '../../../services/api';
import { HOSPITALID } from '../../../models/hospital';
import { ConsultaPacienteCPF } from '../../components/AtendimentoRegistro/ConsultaPacienteCPF';
import type { Paciente } from '../../../models/paciente';

export function AtendimentoRegistro() {
    const [tipoCadastro, setTipoCadastro] = useState<keyof MapTiposCadastro>('Consulta');
    const [dado, setDado] = useState<Record<string, any>>({});
    const [paciente, setPaciente] = useState<Paciente | null>(null);

    function onChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        let valorFinal: string | number | boolean = value;

        if (name === "emTratamento") {
            valorFinal = (value === "true");
            setDado(prev => ({
                ...prev,
                [name]: valorFinal,
            }));
            return;
        }

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

        if ("salaId" in novoDado) {
            novoDado.salaId = (await api.get(`Sala?$filter=numero eq '${novoDado.salaId}'`)).data[0].id;
        }

        if ("ProfResponsavelId" in novoDado) {
            novoDado.ProfResponsavelId = (await api.get(`ProfissionalSaude?$filter=tolower(nome) eq tolower('${novoDado.ProfResponsavelId}')`)).data[0].id;
        }

        if ("quartoId" in novoDado) {
            novoDado.quartoId = (await api.get(`Quarto?$filter=numero eq '${novoDado.quartoId}'`)).data[0].id;
        }

        if ("tipoExameId" in novoDado) {
            novoDado.tipoExameId = (await api.get(`Exame?$filter=tolower(nome) eq tolower('${novoDado.tipoExameId}')`)).data[0].id;
        }

        if ("ModeloId" in novoDado && tipoCadastro === 'DoencaCronica') {
            novoDado.ModeloId = (await api.get(`DoencaCronicaModelo?$filter=tolower(nome) eq tolower('${novoDado.ModeloId}')`)).data[0].id;
        }

        if ("modeloId" in novoDado && tipoCadastro === 'Medicacao') {
            novoDado.modeloId = (await api.get(`MedicamentoModelo?$filter=tolower(nome) eq tolower('${novoDado.modeloId}')`)).data[0].id;
        }

        if ("vacinaId" in novoDado) {
            novoDado.vacinaId = (await api.get(`Vacina?$filter=tolower(lote) eq tolower('${novoDado.vacinaId}')`)).data[0].id;
        }

        if ("alergiaId" in novoDado) {
            novoDado.alergiaId = (await api.get(`Alergia?$filter=tolower(nome) eq tolower('${novoDado.alergiaId}')`)).data[0].id;
        }

        const prontuarioResp = await api.get(
            `/PacienteProntuario?$filter=tolower(paciente/cpf) eq tolower('${paciente?.cpf}')`
        );

        if (tipoCadastro === 'Consulta' ||
            tipoCadastro === 'Vacinacao' ||
            tipoCadastro === 'Internacao' ||
            tipoCadastro === 'Exame' ||
            tipoCadastro === 'Cirurgia') {
            (novoDado as any).hospitalId = HOSPITALID;
        }

        novoDado.prontuarioId = prontuarioResp.data[0].id;

        try {
            await api.post(`/Paciente${tipoCadastro}`, novoDado);
            alert(`${tipoCadastro} salvo com sucesso!`);
            setDado({});
        } catch (error) {
            alert(`Erro ao salvar o registro de ${tipoCadastro}. Por favor, tente novamente.`);
        }

    }

    return (
        <>
            <Header />
            <main>
                <h1>Registro de Atendimento e Prontuário</h1>

                <ConsultaPacienteCPF paciente={paciente} setPaciente={setPaciente} />

                {paciente && paciente.nome && (
                    <div id="area-de-trabalho">

                        <div id="paciente-encontrado">
                            <section className="card-prontuario" id="dados-paciente">
                                <div className="card-header">
                                    <h2>Paciente Localizado</h2>
                                </div>
                                <div className="card-body info-paciente">
                                    <div><strong>Nome:</strong>{paciente.nome}</div>
                                    <div><strong>Data de Nasc.:</strong>{paciente.dataNascimento}</div>
                                    <div><strong>CPF:</strong>{paciente.cpf}</div>
                                </div>
                            </section>

                            <section id="adicionar-registro">
                                <h2>Adicionar Nova Informação</h2>
                                <form autoComplete="off">
                                    <div className="form-group">
                                        <label htmlFor="tipo-registro">Selecione o tipo de registro</label>
                                        <select id="tipo-registro" name="tipo-registro" onChange={(e) => setTipoCadastro(e.target.value as keyof MapTiposCadastro)}>
                                            <option value="Consulta">Nova Consulta</option>
                                            <option value="Vacinacao">Nova Vacina</option>
                                            <option value="Internacao">Nova Internação</option>
                                            <option value="Alergia">Nova Alergia</option>
                                            <option value="Exame">Novo Exame</option>
                                            <option value="DoencaCronica">Nova Doença Crônica</option>
                                            <option value="Medicacao">Nova Medicação</option>
                                            <option value="Cirurgia">Nova Cirurgia</option>
                                        </select>
                                    </div>

                                    {tipoCadastro === 'Consulta' && <CadastroConsulta consulta={dado as Partial<Consulta>} onChange={onChange} />}

                                    {tipoCadastro === 'Vacinacao' && <CadastroVacinacao vacina={dado as Partial<Vacinacao>} onChange={onChange} />}

                                    {tipoCadastro === 'Internacao' && <CadastroInternacao internacao={dado as Partial<Internacao>} onChange={onChange} />}

                                    {tipoCadastro === 'Alergia' && <CadastroAlergia alergia={dado as Partial<PacienteAlergia>} onChange={onChange} />}

                                    {tipoCadastro === 'Exame' && <CadastroExame exame={dado as Partial<PacienteExame>} onChange={onChange} />}

                                    {tipoCadastro === 'DoencaCronica' && <CadastroDoencaCronica doencaCronica={dado as Partial<DoencaCronica>} onChange={onChange} />}

                                    {tipoCadastro === 'Medicacao' && <CadastroMedicacao medicacao={dado as Partial<Medicacao>} onChange={onChange} />}

                                    {tipoCadastro === 'Cirurgia' && <CadastroCirurgia cirurgia={dado as Partial<Cirurgia>} onChange={onChange} />}

                                    <button type="button" className="btn-salvar" onClick={HandleSubmit}>Salvar Registro</button>
                                </form>
                            </section>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}