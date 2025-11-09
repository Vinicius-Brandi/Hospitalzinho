import { useState } from "react";
import { Footer } from "../components/HeaderAndFooter/Footer"
import { Header } from "../components/HeaderAndFooter/Header"
import type { Hospital } from "../../models/hospital";
import "./HospitalCadastro.css"
import { api } from "../../services/api";

export default function HospitalCadastro() {
    const [tipoCadastro, setTipoCadastro] = useState("instituicao");
    const [hospital, setHospital] = useState<Partial<Hospital>>({});

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setHospital((prev) => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        try {
            const payload = {
                ...hospital,
            };
            if (tipoCadastro === "instituicao") {
                await api.post("/Hospital", payload);
            } else {
                await api.post("/HospitalUnidade", payload);
            }
        }catch (error) {
            console.error("Erro ao cadastrar hospital:", error);
            alert("Erro ao cadastrar hospital. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <Header />
            <main>
                <h1>Cadastro de Novo Hospital</h1>

                <section id="cadastro-hospital">
                    <h2>Informações da Unidade</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group-selector">
                            <label htmlFor="tipoCadastro">Tipo de Cadastro</label>
                            <select id="tipoCadastro" name="tipoCadastro" onChange={(e) => setTipoCadastro(e.target.value)}>
                                <option value="instituicao" selected>Instituição Principal</option>
                                <option value="unidade">Unidade Vinculada</option>
                            </select>
                        </div>

                        {tipoCadastro === "instituicao" && (
                            <fieldset>
                                <legend>Dados Gerais</legend>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome do Hospital / Unidade</label>
                                        <input type="text" id="nome" name="nome" required maxLength={255} onChange={handleInputChange} value={hospital.nome || ""} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cnpj">CNPJ</label>
                                        <input type="text" id="cnpj" name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" onChange={handleInputChange} value={hospital.cnpj || ""} />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="tokenAcesso">Token</label>
                                        <input type="text" id="tokenAcesso" name="tokenAcesso" placeholder="Digite o token de acesso" onChange={handleInputChange} value={hospital.tokenAcesso || ""} />
                                    </div>
                                </div>
                            </fieldset>
                        )}

                        {tipoCadastro === "unidade" && (
                            <>
                                <fieldset>
                                    <legend>Instituição Principal</legend>

                                    <div className="form-grid">
                                        <div className="form-group" id="vinculoInstituicaoContainer">
                                            <label htmlFor="instituicaoPaiId">Vincular à Instituição Principal</label>
                                            <input type="text" id="instituicaoPaiId" name="instituicaoPaiId" placeholder="Digite o CNPJ da instituição principal" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cnes-hospital">CNES</label>
                                            <input type="text" id="cnes-hospital" name="cnes-hospital" maxLength={7} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="tipo-unidade-cadastro">Tipo de Unidade</label>
                                            <select id="tipo-unidade-cadastro" name="tipo-unidade-cadastro" required>
                                                <option value="" disabled selected>Selecione o tipo</option>
                                                <option value="ubs">Unidade Básica de Saúde (UBS) / Posto de Saúde</option>
                                                <option value="centro-saude">Centro de Saúde</option>
                                                <option value="ambulatorio">Ambulatório de Especialidade / Policlínica</option>
                                                <option value="clinica">Clínica Especializada</option>
                                                <option value="hospital-esp">Hospital Especializado</option>
                                                <option value="caps">Centro de Atenção Psicossocial (CAPS)</option>
                                                <option value="hospital-geral">Hospital Geral</option>
                                                <option value="hospital-dia">Hospital-Dia</option>
                                                <option value="upa">Unidade de Pronto Atendimento (UPA)</option>
                                                <option value="pronto-socorro">Pronto-Socorro</option>
                                                <option value="sadt">Serviços de Apoio Diagnóstico e Terapêutico (SADT)</option>
                                                <option value="farmacia">Farmácia</option>
                                                <option value="vigilancia">Vigilância Sanitária e Epidemiológica</option>
                                                <option value="reabilitacao">Centro de Reabilitação</option>
                                            </select>
                                        </div>
                                    </div>

                                </fieldset>

                                <fieldset>
                                    <legend>Endereço</legend>

                                    <div className="address-grid">
                                        <div className="form-group">
                                            <label htmlFor="cep">CEP:</label>
                                            <input type="text" id="cep" name="cep" placeholder="XXXXX-XXX" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cidade">Cidade:</label>
                                            <select id="cidade" name="cidade" required>
                                                <option value="" disabled selected>Selecione a cidade/distrito</option>
                                                <option value="marilia">Marília</option>
                                                <option value="amadeu-amaral">Amadeu Amaral</option>
                                                <option value="avencas">Avencas</option>
                                                <option value="dirceu">Dirceu</option>
                                                <option value="lacio">Lácio</option>
                                                <option value="padre-nobrega">Padre Nóbrega</option>
                                                <option value="rosalia">Rosália</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bairro">Bairro:</label>
                                            <input type="text" id="bairro" name="bairro" />
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="rua">Rua:</label>
                                            <input type="text" id="rua" name="rua" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numero">Número:</label>
                                            <input type="text" id="numero" name="numero" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="complemento">Complemento:</label>
                                            <input type="text" id="complemento" name="complemento" />
                                        </div>
                                    </div>
                                </fieldset>
                            </>
                        )}



                        <div className="botoes-form">
                            <button type="submit" className="btn-salvar">Salvar Cadastro</button>
                            <button type="button" className="btn-cancelar" >Cancelar</button>
                        </div>
                    </form>
                </section>

            </main>
            <Footer />
        </>
    )
}