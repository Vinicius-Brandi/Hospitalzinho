import { useRef, useState } from "react";
import { Footer } from "../components/HeaderAndFooter/Footer"
import { Header } from "../components/HeaderAndFooter/Header"
import { TipoUnidade, type Hospital, type HospitalUnidade, type HospitalUnidadeEndereco } from "../../models/hospital";
import "./HospitalCadastro.css"
import { api } from "../../services/api";

export default function HospitalCadastro() {
    const [tipoCadastro, setTipoCadastro] = useState("instituicao");
    const [hospital, setHospital] = useState<Partial<Hospital>>({});
    const [hospitalUnidade, setHospitalUnidade] = useState<Partial<HospitalUnidade>>({});
    const [carregandoCep, setCarregandoCep] = useState(false);

    const ultimoCepPesquisado = useRef(""); 

    const formatarCNPJ = (value: string) => {
        const v = value.replace(/\D/g, "");
        if (v.length > 14) return value.substring(0, 18);
        return v
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    };

    const formatarCEP = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 9);
    };

    const normalizarTextoCidade = (cidadeApi: string) => {
        return cidadeApi.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");
    };

    async function buscarEnderecoPorCep(cepDigitado: string) {
        const cepLimpo = cepDigitado.replace(/\D/g, '');

        if (cepLimpo.length < 8) {
            ultimoCepPesquisado.current = "";
            return;
        }

        if (cepLimpo.length === 8) {
            if (cepLimpo === ultimoCepPesquisado.current) return;

            ultimoCepPesquisado.current = cepLimpo;

            setCarregandoCep(true);
            try {
                const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                const dados = await resposta.json();

                if (!dados.erro) {
                    setHospitalUnidade(prevState => {
                        const enderecoAtual = prevState.endereco || {} as HospitalUnidadeEndereco;
                        return {
                            ...prevState,
                            endereco: {
                                cep: cepDigitado,
                                cidade: normalizarTextoCidade(dados.localidade),
                                bairro: dados.bairro,
                                rua: dados.logradouro,
                                numero: enderecoAtual.numero || "",
                                complemento: enderecoAtual.complemento || ""
                            }
                        };
                    });
                } else {
                    alert("CEP não encontrado.");
                    setHospitalUnidade(prevState => ({
                        ...prevState,
                        endereco: {
                            cep: "",
                            cidade: "",
                            bairro: "",
                            rua: "",
                            numero: "",
                            complemento: ""
                        }
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CEP", error);
            } finally {
                setCarregandoCep(false);
            }
        }
    };

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        let { name, value } = e.target;

        if (name === "cnpj" || name === "instituicaoPaiId") {
            value = formatarCNPJ(value);
        }

        if (name === "endereco.cep") {
            value = formatarCEP(value);
            buscarEnderecoPorCep(value);
        }

        if (tipoCadastro === "instituicao") {
            setHospital(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (tipoCadastro === "unidade") {
            if (name.includes(".")) {
                const [parentKey, childKey] = name.split(".");

                if (parentKey === "endereco") {
                    setHospitalUnidade(prevState => ({
                        ...prevState,
                        endereco: {
                            ...(prevState.endereco || {} as HospitalUnidadeEndereco),
                            [childKey]: value
                        } as HospitalUnidadeEndereco
                    }));
                }
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
                alert("Instituição cadastrada com sucesso! (Mock)");
            } catch (error) {
                console.error("Erro ao cadastrar instituição:", error);
                alert("Erro ao cadastrar instituição.");
            }
        } else if (tipoCadastro === "unidade") {
            try {
                const hospitalPai = await api.get("/Hospital", {
                    params: {
                        $filter: `cnpj eq '${hospitalUnidade.instituicaoPaiId}'`
                    }
                });

                const dadosPai = hospitalPai.data;

                const unidadeParaEnvio = { ...hospitalUnidade };

                if (dadosPai && dadosPai.length > 0) {
                    unidadeParaEnvio.instituicaoPaiId = dadosPai[0].id;
                }

                if (typeof unidadeParaEnvio.tipoUnidade === "string") {
                    unidadeParaEnvio.tipoUnidade = TipoUnidade[unidadeParaEnvio.tipoUnidade];
                }

                await api.post("/HospitalUnidade/cadastro", unidadeParaEnvio);
                setHospitalUnidade({});
                setHospital({});
                alert("Unidade cadastrada com sucesso!");
            } catch (error) {
                console.error("Erro ao cadastrar unidade:", error);
                alert("Erro ao cadastrar unidade.");
            }
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h1>
                    Cadastro de Novo Hospital
                </h1>

                <section>
                    <h2>
                        Informações da Unidade
                    </h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="tipoCadastro">
                                Tipo de Cadastro
                            </label>
                            <select
                                id="tipoCadastro"
                                name="tipoCadastro"
                                onChange={(e) => setTipoCadastro(e.target.value)}
                            >
                                <option value="instituicao">Instituição Principal</option>
                                <option value="unidade">Unidade Vinculada</option>
                            </select>
                        </div>

                        {tipoCadastro === "instituicao" && (
                            <fieldset>
                                <legend>Dados Gerais</legend>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome da instituição</label>
                                        <input
                                            type="text" id="nome" name="nome" required maxLength={255}
                                            onChange={handleInputChange} value={hospital.nome || ""}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cnpj">CNPJ</label>
                                        <input
                                            type="text"
                                            id="cnpj"
                                            name="cnpj"
                                            placeholder="XX.XXX.XXX/XXXX-XX"
                                            maxLength={18}
                                            onChange={handleInputChange}
                                            value={hospital.cnpj || ""}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="tokenAcesso">Token</label>
                                        <input
                                            type="text" id="tokenAcesso" name="tokenAcesso"
                                            placeholder="Digite o token de acesso"
                                            onChange={handleInputChange} value={hospital.tokenAcesso || ""}
                                        />
                                    </div>
                                </div>
                            </fieldset>
                        )}

                        {tipoCadastro === "unidade" && (
                            <>
                                <fieldset>
                                    <legend>Instituição Principal</legend>

                                    <div >
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome da Unidade</label>
                                            <input
                                                type="text" id="nome" name="nome" required maxLength={255}
                                                onChange={handleInputChange} value={hospitalUnidade.nome || ""}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="instituicaoPaiId">Vincular à Instituição Principal</label>
                                            <input
                                                type="text"
                                                id="instituicaoPaiId"
                                                name="instituicaoPaiId"
                                                placeholder="CNPJ da instituição principal"
                                                maxLength={18}
                                                onChange={handleInputChange}
                                                value={hospitalUnidade.instituicaoPaiId || ""}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="CNES">CNES</label>
                                            <input
                                                type="text" id="CNES" name="CNES" maxLength={7}
                                                onChange={handleInputChange} value={hospitalUnidade.CNES || ""}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tipo-unidade-cadastro">Tipo de Unidade</label>
                                            <select
                                                id="tipo-unidade-cadastro" name="tipoUnidade" required
                                                onChange={handleInputChange} value={hospitalUnidade.tipoUnidade || ""}
                                            >
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
                                    <legend >Endereço</legend>

                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="cep">CEP:</label>
                                            <input
                                                type="text" id="cep" name="endereco.cep" placeholder="XXXXX-XXX"
                                                onChange={handleInputChange} value={hospitalUnidade.endereco?.cep || ""}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cidade">Cidade:</label>
                                            <select
                                                id="cidade" name="endereco.cidade" required
                                                onChange={handleInputChange} value={hospitalUnidade.endereco?.cidade || ""}
                                            >
                                                <option value="" disabled>Selecione...</option>
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
                                            <input
                                                type="text" id="bairro" name="endereco.bairro"
                                                onChange={handleInputChange}
                                                value={carregandoCep ? "Buscando..." : (hospitalUnidade.endereco?.bairro || "")}
                                                disabled={carregandoCep}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="rua">Rua:</label>
                                            <input
                                                type="text"
                                                id="rua"
                                                name="endereco.rua"
                                                onChange={handleInputChange}
                                                value={carregandoCep ? "Buscando..." : (hospitalUnidade.endereco?.rua || "")}
                                                disabled={carregandoCep}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numero">Número:</label>
                                            <input
                                                type="text" id="numero" name="endereco.numero"
                                                onChange={handleInputChange} value={hospitalUnidade.endereco?.numero || ""}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="complemento">Complemento:</label>
                                            <input
                                                type="text" id="complemento" name="endereco.complemento"
                                                onChange={handleInputChange} value={hospitalUnidade.endereco?.complemento || ""}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </>
                        )}

                        <div>
                            <button
                                type="submit"
                            >
                                Salvar Cadastro
                            </button>
                        </div>
                    </form>
                </section>

            </main>
            <Footer />
        </div>
    )
}