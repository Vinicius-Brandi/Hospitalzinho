import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import '../Prontuario/ProntuarioCadastro.css';
import { PacienteGenero, PacienteEtinia, PacienteEscolaridade} from "../../../models/paciente";
import type { Paciente } from "../../../models/paciente";
import { useState } from "react";
import { api } from "../../../services/api";

export function PacienteCadastro() {
  const [paciente, setPaciente] = useState<Partial<Paciente>>({});

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setPaciente((prevPaciente) => {
        const keys = name.split('.');
        if (keys.length === 2){
            const [objName, fielName] = keys;
            return {
                ...prevPaciente,
                [objName]: {
                    ...(prevPaciente as any)[objName],
                    [fielName]: value
                }
            };
        }

        return {
            ...prevPaciente,
            [name]: value
        };
    })
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!paciente.nome || !paciente.cpf || !paciente.cns) {
        alert("Por favor, preencha os campos obrigatórios: Nome, CPF e CNS.");
        return;
    }

    try {
        const payload = {
            ...paciente,
            dataNascimento: paciente.dataNascimento
                ? new Date(paciente.dataNascimento).toISOString()
                : undefined,
            sexo: paciente.sexo ? Number(paciente.sexo) : undefined,
            raca: paciente.raca ? Number(paciente.raca) : undefined,
            escolaridade: paciente.escolaridade ? Number(paciente.escolaridade) : undefined,
        };

        await api.post("/Paciente", payload);
        alert("Paciente cadastrado com sucesso!");
        setPaciente({});
    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        alert("Ocorreu um erro ao cadastrar o paciente.");
    }
  }

  return (
    <>
      <Header />
      <main>
        <h1>Cadastro de Paciente</h1>
        <div id="paciente-nao-encontrado">
            <section id="cadastro-novo-paciente">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados Pessoais</legend>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="nome">Nome Completo</label>
                                <input type="text" id="nome" name="nome" value={paciente.nome || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dataNascimento">Data de Nascimento</label>
                                <input type="date" id="dataNascimento" name="dataNascimento" value={paciente.dataNascimento || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" id="cpf" name="cpf" value={paciente.cpf || ""} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cns">CNS</label>
                                <input type="text" id="cns" name="cns" value={paciente.cns || ""} onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="sexo">Sexo</label>
                                <select id="sexo" name="sexo" value={paciente.sexo || ""} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    <option value={PacienteGenero.Masculino}>Masculino</option>
                                    <option value={PacienteGenero.Feminino}>Feminino</option>
                                    <option value={PacienteGenero.Outro}>Outro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="raca">Raça/Cor</label>
                                <select id="raca" name="raca" value={paciente.raca || ""} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    <option value={PacienteEtinia.Branca}>Branca</option>
                                    <option value={PacienteEtinia.Preta}>Preta</option>
                                    <option value={PacienteEtinia.Parda}>Parda</option>
                                    <option value={PacienteEtinia.Amarela}>Amarela</option>
                                    <option value={PacienteEtinia.Indigena}>Indígena</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nacionalidade">Nacionalidade</label>
                                <input type="text" id="nacionalidade" name="nacionalidade" value={paciente.nacionalidade || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="naturalidade">Naturalidade (Cidade de Nascimento)</label>
                                <input type="text" id="naturalidade" name="naturalidade" placeholder="Ex: Marília - SP" value={paciente.naturalidade || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="escolaridade">Escolaridade</label>
                                <select id="escolaridade" name="escolaridade" value={paciente.escolaridade || ""} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    <option value={PacienteEscolaridade.Analfabeto}>Analfabeto</option>
                                    <option value={PacienteEscolaridade.FundamentalIncompleto}>Fundamental Incompleto</option>
                                    <option value={PacienteEscolaridade.FundamentalCompleto}>Fundamental Completo</option>
                                    <option value={PacienteEscolaridade.MedioIncompleto}>Médio Incompleto</option>
                                    <option value={PacienteEscolaridade.MedioCompleto}>Médio Completo</option>
                                    <option value={PacienteEscolaridade.SuperiorIncompleto}>Superior Incompleto</option>
                                    <option value={PacienteEscolaridade.SuperiorCompleto}>Superior Completo</option>
                                    <option value={PacienteEscolaridade.PosGraduacao}>Pós Graduação</option>
                                    <option value={PacienteEscolaridade.NaoSeAplica}>Não Se Aplica</option>
                                </select>
                            </div>
                            <div className="form-group mid-width">
                                <label htmlFor="nomeMae">Nome Completo da Mãe</label>
                                <input type="text" id="nomeMae" name="nomeMae" value={paciente.nomeMae || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpfMae">CPF da Mãe</label>
                                <input type="text" id="cpfMae" name="cpfMae" placeholder="000.000.000-00" value={paciente.cpfMae || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group mid-width">
                                <label htmlFor="nomePai">Nome Completo do Pai</label>
                                <input type="text" id="nomePai" name="nomePai" value={paciente.nomePai || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpfPai">CPF do Pai</label>
                                <input type="text" id="cpfPai" name="cpfPai" placeholder="000.000.000-00" value={paciente.cpfPai || ""} onChange={handleChange} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Endereço</legend>
                        <div className="address-grid">
                            <div className="form-group">
                                <label htmlFor="cep">CEP</label>
                                <input type="text" id="cep" name="cep" placeholder="00000-000" />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="logradouro">Logradouro</label>
                                <input type="text" id="logradouro" name="logradouro" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numero">Número</label>
                                <input type="text" id="numero" name="numero" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="complemento">Complemento</label>
                                <input type="text" id="complemento" name="complemento" placeholder="Ex: Apto 101" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bairro">Bairro</label>
                                <input type="text" id="bairro" name="bairro" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" id="cidade" name="cidade" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="estado">Estado</label>
                                <input type="text" id="estado" name="estado" />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Contato</legend>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="telefoneResidencial">Telefone Residencial</label>
                                <input type="tel" id="telefoneResidencial" name="contatos.telefoneResidencial" placeholder="(00) 0000-0000" value={paciente.contatos?.telefoneResidencial || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefoneCelular">Telefone Celular</label>
                                <input type="tel" id="telefoneCelular" name="contatos.telefoneCelular" placeholder="(00) 00000-0000" value={paciente.contatos?.telefoneCelular || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="contatos.email" placeholder="exemplo@email.com" value={paciente.contatos?.email || ""} onChange={handleChange} />
                            </div>
                        </div>
                    </fieldset>
                    <div className="botoes-form">
                        <button type="submit" className="btn-salvar">Salvar Novo Paciente</button>
                    </div>
                </form>
            </section>

        </div>
      </main>
      <Footer />
    </>
  )
}