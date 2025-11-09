import { useState } from "react";
import { Footer } from "../components/HeaderAndFooter/Footer"
import { Header } from "../components/HeaderAndFooter/Header"
import type { Hospital, HospitalUnidade, HospitalUnidadeEndereco } from "../../models/hospital";
import "./HospitalCadastro.css"
import { api } from "../../services/api";

export default function HospitalCadastro() {
    const [tipoCadastro, setTipoCadastro] = useState("instituicao");
    const [hospital, setHospital] = useState<Partial<Hospital>>({});
    const [hospitalUnidade, setHospitalUnidade] = useState<Partial<HospitalUnidade>>({});

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;

        if (tipoCadastro === "instituicao") {
            setHospital(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (tipoCadastro === "unidade") {
            if (name.split(".").length > 1) {
                const [parentKey, childKey] = name.split(".");
                setHospitalUnidade(prevState => ({
                    ...prevState,
                    [parentKey]: {
                        ...prevState.endereco,
                        [childKey]: value
                    }
                }));
            } else {
                setHospitalUnidade(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (tipoCadastro === "instituicao") {
            try {
                await api.post("/Hospital", hospital);
                alert("Instituição cadastrada com sucesso!");
            } catch (error) {
                console.error("Erro ao cadastrar instituição:", error);
                alert("Erro ao cadastrar instituição. Verifique os dados e tente novamente.");
            }
        } else if (tipoCadastro === "unidade") {
            try {
                const hospitalPai = await api.get("/Hospital", {
                    params: {
                        $filter: `cnpj eq '${hospitalUnidade.instituicaoPaiId}'`
                    }
                });

                hospitalUnidade.instituicaoPaiId = hospitalPai.data[0].id;
                console.log(hospitalPai.data);
                await api.post("/HospitalUnidade", hospitalUnidade);
                alert("Unidade cadastrada com sucesso!");
            } catch (error) {
                console.error("Erro ao cadastrar unidade:", error);
                alert("Erro ao cadastrar unidade. Verifique os dados e tente novamente.");
            }
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
                                <option value="instituicao" >Instituição Principal</option>
                                <option value="unidade">Unidade Vinculada</option>
                            </select>
                        </div>

                        {tipoCadastro === "instituicao" && (
                            <fieldset>
                                <legend>Dados Gerais</legend>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome da instituição</label>
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
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome da Unidade</label>
                                            <input type="text" id="nome" name="nome" required maxLength={255} onChange={handleInputChange} value={hospitalUnidade.nome || ""} />
                                        </div>

                                        <div className="form-group" id="vinculoInstituicaoContainer">
                                            <label htmlFor="instituicaoPaiId">Vincular à Instituição Principal</label>
                                            <input type="text" id="instituicaoPaiId" name="instituicaoPaiId" placeholder="Digite o CNPJ da instituição principal" onChange={handleInputChange} value={hospitalUnidade.instituicaoPaiId || ""} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="CNES">CNES</label>
                                            <input type="text" id="CNES" name="CNES" maxLength={7} onChange={handleInputChange} value={hospitalUnidade.CNES || ""} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="tipo-unidade-cadastro">Tipo de Unidade</label>
                                            <select id="tipo-unidade-cadastro" name="tipoUnidade" required onChange={handleInputChange} value={hospitalUnidade.tipoUnidade || "UnidadeBasicaDeSaude"}>
                                                <option value="" >Selecione o tipo</option>
                                                <option value="UnidadeBasicaDeSaude">Unidade Básica de Saúde (UBS) / Posto de Saúde</option>
                                                <option value="CentroDeSaude">Centro de Saúde</option>
                                                <option value="AmbulatorioDeEspecialidade">Ambulatório de Especialidade / Policlínica</option>
                                                <option value="ClinicaEspecializada">Clínica Especializada</option>
                                                <option value="HospitalEspecializado">Hospital Especializado</option>
                                                <option value="CentroDeAtencaoPsicossocial">Centro de Atenção Psicossocial (CAPS)</option>
                                                <option value="HospitalGeral">Hospital Geral</option>
                                                <option value="HospitalDia">Hospital-Dia</option>
                                                <option value="UnidadeDeProntoAtendimento">Unidade de Pronto Atendimento (UPA)</option>
                                                <option value="ProntoSocorro">Pronto-Socorro</option>
                                                <option value="ServicosDeApoioDiagnosticoETerapia">Serviços de Apoio Diagnóstico e Terapêutico (SADT)</option>
                                                <option value="Farmacia">Farmácia</option>
                                                <option value="VigilanciaSanitariaEpidemiologica">Vigilância Sanitária e Epidemiológica</option>
                                                <option value="CentroDeReabilitacao">Centro de Reabilitação</option>
                                            </select>
                                        </div>
                                    </div>

                                </fieldset>

                                <fieldset>
                                    <legend>Endereço</legend>

                                    <div className="address-grid">
                                        <div className="form-group">
                                            <label htmlFor="cep">CEP:</label>
                                            <input type="text" id="cep" name="endereco.cep" placeholder="XXXXX-XXX" onChange={handleInputChange} value={hospitalUnidade.endereco?.cep || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cidade">Cidade:</label>
                                            <select id="cidade" name="endereco.cidade" required onChange={handleInputChange} value={hospitalUnidade.endereco?.cidade || "marilia"}>
                                                <option value="" disabled>Selecione a cidade/distrito</option>
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
                                            <input type="text" id="bairro" name="endereco.bairro" onChange={handleInputChange} value={hospitalUnidade.endereco?.bairro || ""} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label htmlFor="rua">Rua:</label>
                                            <input type="text" id="rua" name="endereco.rua" onChange={handleInputChange} value={hospitalUnidade.endereco?.rua || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numero">Número:</label>
                                            <input type="text" id="numero" name="endereco.numero" onChange={handleInputChange} value={hospitalUnidade.endereco?.numero || ""} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="complemento">Complemento:</label>
                                            <input type="text" id="complemento" name="endereco.complemento" onChange={handleInputChange} value={hospitalUnidade.endereco?.complemento || ""} />
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