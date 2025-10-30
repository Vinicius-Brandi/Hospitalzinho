import { Header } from "../../components/Header_and_Footer/Header";
import { Footer } from "../../components/Header_and_Footer/Footer";
import '../Prontuario/CadastroProntuario.css'
import { useState } from "react";

export function CadastroPaciente() {
    const [form, setForm] = useState({
        nome: "",
        cns: "",
        cpf: "",
        nomePai: "",
        nomeMae: "",
        cpfPai: "",
        cpfMae: "",
        nacionalidade: "Brasileira",
        naturalidade: "",
        dataNascimento: "",
        genero: "",
        etinia: "",
        escolaridade: "",
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
        },
        contato: {
            telefoneResidencial: "",
            telefoneCelular: "",
            email: "",
        },
    });

    const [mensagem, setMensagem] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        // se for campo de endereço
        if (name.startsWith("endereco.")) {
            const campo = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                endereco: { ...prev.endereco, [campo]: value },
            }));
        }
        // se for campo de contato
        else if (name.startsWith("contato.")) {
            const campo = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                contato: { ...prev.contato, [campo]: value },
            }));
        }
        // campos normais
        else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMensagem("Enviando dados...");

        // Converter campos que precisam ser numéricos
        const paciente = {
            ...form,
            genero: form.genero !== "" ? Number(form.genero) : null,
            etinia: form.etinia !== "" ? Number(form.etinia) : null,
            escolaridade: form.escolaridade !== "" ? Number(form.escolaridade) : null,
            dataNascimento: form.dataNascimento
                ? new Date(form.dataNascimento).toISOString()
                : null,
        };

        try {
            const resposta = await fetch("http://localhost:5139/api/Paciente/CadastrarPaciente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paciente),
            });

            if (!resposta.ok) throw new Error("Erro ao cadastrar paciente.");

            const dados = await resposta.json();
            console.log("Paciente cadastrado:", dados);
            setMensagem("✅ Paciente cadastrado com sucesso!");
        } catch (err) {
            console.error(err);
            setMensagem("❌ Erro ao cadastrar paciente.");
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
                                        <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                                        <input type="date" id="dataNascimento" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpf">CPF</label>
                                        <input type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cns">CNS</label>
                                        <input type="text" id="cns" name="cns" value={form.cns} onChange={handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="genero">Sexo</label>
                                        <select id="genero" name="genero" value={form.genero} onChange={handleChange}>
                                            <option value="">Selecione...</option>
                                            <option value="0">Masculino</option>
                                            <option value="1">Feminino</option>
                                            <option value="2">Outro</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="etinia">Raça/Cor</label>
                                        <select id="etinia" name="etinia" value={form.etinia} onChange={handleChange}>
                                            <option value="">Selecione...</option>
                                            <option value="0">Branca</option>
                                            <option value="1">Preta</option>
                                            <option value="2">Parda</option>
                                            <option value="3">Amarela</option>
                                            <option value="4">Indígena</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="escolaridade">Escolaridade</label>
                                        <select id="escolaridade" name="escolaridade" value={form.escolaridade} onChange={handleChange}>
                                            <option value="">Selecione...</option>
                                            <option value="0">Analfabeto</option>
                                            <option value="1">Fundamental Incompleto</option>
                                            <option value="2">Fundamental Completo</option>
                                            <option value="3">Médio Incompleto</option>
                                            <option value="4">Médio Completo</option>
                                            <option value="5">Superior Incompleto</option>
                                            <option value="6">Superior Completo</option>
                                            <option value="7">Pós Graduação</option>
                                        </select>
                                    </div>
                                    <div className="form-group mid-width">
                                        <label htmlFor="nomeMae">Nome Completo da Mãe</label>
                                        <input type="text" id="nomeMae" name="nomeMae" value={form.nomeMae} onChange={handleChange} />
                                    </div>     
                                    <div className="form-group">
                                        <label htmlFor="cpfMae">CPF da Mãe</label>
                                        <input type="text" id="cpfMae" name="cpfMae" value={form.cpfMae} onChange={handleChange} />
                                    </div>             
                                    <div className="form-group mid-width">
                                        <label htmlFor="nomePai">Nome Completo do Pai</label>
                                        <input type="text" id="nomePai" name="nomePai" value={form.nomePai} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpfPai">CPF da Pai</label>
                                        <input type="text" id="cpfPai" name="cpfPai" value={form.cpfPai} onChange={handleChange} />
                                    </div>       
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Endereço</legend>
                                <div className="address-grid">
                                    <div className="form-group">
                                        <label htmlFor="endereco.cep">CEP</label>
                                        <input type="text" id="endereco.cep" name="endereco.cep" value={form.endereco.cep} onChange={handleChange} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label htmlFor="endereco.logradouro">Logradouro</label>
                                        <input type="text" id="endereco.logradouro" name="endereco.logradouro" value={form.endereco.logradouro} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endereco.numero">Número</label>
                                        <input type="text" id="endereco.numero" name="endereco.numero" value={form.endereco.numero} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endereco.bairro">Bairro</label>
                                        <input type="text" id="endereco.bairro" name="endereco.bairro" value={form.endereco.bairro} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endereco.cidade">Cidade</label>
                                        <input type="text" id="endereco.cidade" name="endereco.cidade" value={form.endereco.cidade} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endereco.estado">Estado</label>
                                        <input type="text" id="endereco.estado" name="endereco.estado" value={form.endereco.estado} onChange={handleChange} />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Contato</legend>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="contato.telefoneResidencial">Telefone Residencial</label>
                                        <input type="tel" id="contato.telefoneResidencial" name="contato.telefoneResidencial" value={form.contato.telefoneResidencial} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contato.telefoneCelular">Telefone Celular</label>
                                        <input type="tel" id="contato.telefoneCelular" name="contato.telefoneCelular" value={form.contato.telefoneCelular} onChange={handleChange} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label htmlFor="contato.email">Email</label>
                                        <input type="email" id="contato.email" name="contato.email" value={form.contato.email} onChange={handleChange} />
                                    </div>
                                </div>
                            </fieldset>

                            <div className="botoes-form">
                                <button type="submit" className="btn-salvar">Salvar Novo Paciente</button>
                            </div>

                            {mensagem && <p className="mensagem">{mensagem}</p>}
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}