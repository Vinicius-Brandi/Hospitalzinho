import { useState } from "react";
import { Footer } from "../components/HeaderAndFooter/Footer";
import { Header } from "../components/HeaderAndFooter/Header";
import './HospitalConsulta.css';
import { api } from "../../services/api";
import { tipoUnidadeOptions, type TipoUnidadeType } from "../../models/hospital";

export default function HospitalConsulta() {
    const [tipoPesquisa, setTipoPesquisa] = useState('nome');
    const [valorPesquisa, setValorPesquisa] = useState('');
    const [filtros, setFiltros] = useState<{ tiposUnidade: TipoUnidadeType[] }>({
        tiposUnidade: [],
    });
    const [enderecoFiltro, setEnderecoFiltro] = useState('');

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, checked } = e.target;
        const valorNumerico = Number(value) as TipoUnidadeType;

        setFiltros(prev => ({
            ...prev,
            tiposUnidade: checked
                ? [...prev.tiposUnidade, valorNumerico]
                : prev.tiposUnidade.filter(v => v !== valorNumerico),
        }));
    }

    function montarFiltroOData() {
        const filtrosOData: string[] = [];

        if (valorPesquisa.trim() !== "") {
            const campo =
                tipoPesquisa === "nome"
                    ? "Nome"
                    : tipoPesquisa === "cnes"
                        ? "Cnes"
                        : "Cnpj";
            filtrosOData.push(`contains(${campo},'${valorPesquisa}')`);
        }

        if (filtros.tiposUnidade.length > 0) {
            const tipoFiltro = filtros.tiposUnidade
                .map(v => `TipoUnidade eq '${v}'`)
                .join(" or ");
            filtrosOData.push(`(${tipoFiltro})`);
        }

        if (enderecoFiltro.trim() !== "") {
            filtrosOData.push(`contains(Endereco/Cidade,'${enderecoFiltro}')`);
        }

        return filtrosOData.length > 0 ? filtrosOData.join(" and ") : "";
    }


    async function buscarHospitais() {
        const filtro = montarFiltroOData();

        const query = filtro
            ? `/HospitalUnidade?$filter=${encodeURIComponent(filtro)}`
            : "/HospitalUnidade";

        try {
            const response = await api.get(query);
            console.log("Hospitais filtrados:", response.data.value);
        } catch (error) {
            console.error("Erro ao buscar hospitais:", error);
        }
    }

    return (
        <>
            <Header />
            <main>
                <h1>Consulta de Hospitais</h1>

                <section id="filtro-pesquisa">
                    <h2>Filtros de Pesquisa</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            buscarHospitais();
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="tipo-pesquisa">Pesquisar por:</label>
                            <select id="tipo-pesquisa" name="tipo-pesquisa" onChange={(e) => setTipoPesquisa(e.target.value)} value={tipoPesquisa}>
                                <option value="nome">Nome</option>
                                <option value="cnes">CNES</option>
                                <option value="cnpj">CNPJ</option>
                            </select>
                            <input type="text" id="valor-pesquisa" name="valor-pesquisa" placeholder={`Digite o ${tipoPesquisa} do hospital`} maxLength={255} style={{ marginTop: "0.5rem" }} value={valorPesquisa} onChange={(e) => setValorPesquisa(e.target.value)} />
                        </div>

                        <fieldset>
                            <legend>Tipo de Unidade</legend>
                            <div className="checkbox-grid">
                                {tipoUnidadeOptions.map(opt => (
                                    <div key={opt.id}>
                                        <input
                                            type="checkbox"
                                            id={opt.id}
                                            name="tipo-unidade"
                                            value={opt.value}
                                            checked={filtros.tiposUnidade.includes(opt.value)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={opt.id}>{opt.label}</label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Endereço</legend>
                            <div className="address-grid">
                                <div>
                                    <label htmlFor="cidade">Cidade:</label>
                                    <select id="cidade" name="cidade" onChange={(e) => setEnderecoFiltro(e.target.value)} value={enderecoFiltro}>
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
                            </div>
                        </fieldset>

                        <div className="botoes-form">
                            <button type="submit">Pesquisar</button>
                            <button type="reset">Limpar Filtros</button>
                        </div>
                    </form>
                </section>

                <section id="resultados-consulta">
                    <h2>Resultados: </h2>

                    <p id="sem-resultados" style={{ display: 'none' }}>Nenhum resultado encontrado para os filtros informados.</p>

                    <article className="hospital-item">
                        <h3>Hospital Municipal Central</h3>
                        <p><strong>Endereço:</strong> Rua das Flores, 123 - Centro</p>
                        <p><strong>Telefone:</strong> (XX) XXXX-XXXX</p>
                        <p><strong>Especialidades:</strong> Clínica Geral, Pediatria, Ortopedia.</p>
                        <a href="detalhes-hospital-1.html">Ver mais detalhes</a>
                    </article>

                    <article className="hospital-item">
                        <h3>UPA - Unidade de Pronto Atendimento 24h</h3>
                        <p><strong>Endereço:</strong> Avenida Principal, 789 - Bairro Novo</p>
                        <p><strong>Telefone:</strong> (XX) YYYY-YYYY</p>
                        <p><strong>Especialidades:</strong> Atendimento de Urgência e Emergência.</p>
                        <a href="detalhes-hospital-2.html">Ver mais detalhes</a>
                    </article>

                    <article className="hospital-item">
                        <h3>Posto de Saúde da Família</h3>
                        <p><strong>Endereço:</strong> Travessa das Palmeiras, 45 - Vila Esperança</p>
                        <p><strong>Telefone:</strong> (XX) ZZZZ-ZZZZ</p>
                        <p><strong>Especialidades:</strong> Atendimento Primário, Vacinação, Pré-natal.</p>
                        <a href="detalhes-hospital-3.html">Ver mais detalhes</a>
                    </article>

                </section>
            </main>
            <Footer />
        </>
    )
}