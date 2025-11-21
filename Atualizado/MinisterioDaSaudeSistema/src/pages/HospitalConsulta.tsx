import { useState } from "react";
import { Footer } from "../components/HeaderAndFooter/Footer";
import { Header } from "../components/HeaderAndFooter/Header";
import './HospitalConsulta.css';
import { api } from "../../services/api";
import { TipoUnidade, tipoUnidadeOptions, type TipoUnidadeType } from "../../models/hospital";
import type { HospitalUnidade } from "../../models/hospital";
import { SearchHospital } from "../components/SearchHospital";
import { useNavigate } from "react-router";

export default function HospitalConsulta() {
    const [filtros, setFiltros] = useState<{ tiposUnidade: TipoUnidadeType[] }>({
        tiposUnidade: [],
    });
    const [enderecoFiltro, setEnderecoFiltro] = useState('todos');
    const [valorPesquisa, setValorPesquisa] = useState('');
    const [hospitais, setHospitais] = useState<Partial<HospitalUnidade>[]>([]);
    const navigate = useNavigate();

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
        setHospitais([]);

        if (valorPesquisa.trim() !== "") {
            filtrosOData.push(`startswith(tolower(nome), tolower('${valorPesquisa}'))`);
        }

        if (filtros.tiposUnidade.length > 0) {
            const tipoFiltro = filtros.tiposUnidade
                .map(v => `TipoUnidade eq '${v}'`)
                .join(" or ");
            filtrosOData.push(`(${tipoFiltro})`);
        }

        if (enderecoFiltro.trim() !== "" && enderecoFiltro !== "todos") {
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
            setHospitais(response.data);
        } catch (error) {
            console.error("Erro ao buscar hospitais:", error);
        }
    }

    function obterDescricaoUnidade(valor: any): string {
        if (valor === undefined || valor === null) return "Não informado";

        let valorParaBuscar = valor;

        if (typeof valor === 'string') {
            if (valor in TipoUnidade) {
                valorParaBuscar = TipoUnidade[valor as keyof typeof TipoUnidade];
            } else {
                const numeroConvertido = Number(valor);
                if (!isNaN(numeroConvertido)) {
                    valorParaBuscar = numeroConvertido;
                }
            }
        }

        const opcao = tipoUnidadeOptions.find(opt => opt.value === valorParaBuscar);

        return opcao ? opcao.label : `Desconhecido (${valor})`;
    }

    function limparFiltros() {
        setFiltros({ tiposUnidade: [] });
        setEnderecoFiltro('');
        setHospitais([]);
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
                        <SearchHospital setarValorPesquisa={(valor) => setValorPesquisa(valor)} />

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
                                        <option value="todos">Qualquer</option>
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
                            <button type="button" className="button_reset" onClick={limparFiltros}>Limpar Filtros</button>
                        </div>
                    </form>
                </section>

                <section id="resultados-consulta">
                    <h2>Resultados: </h2>

                    <p id="sem-resultados" style={{ display: 'none' }}>Nenhum resultado encontrado para os filtros informados.</p>

                    {hospitais && (
                        hospitais.map((hospital, index) => (
                            <article className="hospital-item" key={index}>
                                <h3>{hospital.nome}l</h3>
                                <p><strong>Endereço:</strong>{hospital.endereco?.rua}, {hospital.endereco?.numero} - {hospital.endereco?.bairro}</p>
                                <p><strong>Especialidades:</strong>{obterDescricaoUnidade(hospital.tipoUnidade)}</p>
                                <a href="detalhes-hospital-1.html">Ver mais detalhes</a>
                            </article>
                        )
                        ))}
                </section>
            </main>
            <Footer />
        </>
    )
}