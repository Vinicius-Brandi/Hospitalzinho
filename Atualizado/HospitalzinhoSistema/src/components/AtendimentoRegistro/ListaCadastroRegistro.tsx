import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Modal } from "../Modal";
import CadastroProfissional from "./CadastroProfissional";
import { CadastroSala } from "./CadastroSala";
import { HOSPITALID } from "../../../models/hospital";
import { CadastroVacina } from "../AtendimentoRegistro/CadastroVacina";
import { CadastroQuarto } from "./CadastroQuarto";
import { CadastroLeito } from "./CadastroLeito";
import { TipoAlergia } from "../../../models/prontuario";

interface ListaCadastroRegistroProps<T> {
    tipoDado: string;
    renderItem: (item: T, index: number) => React.ReactNode;
    titulo?: string;
    temHospitalId?: boolean;
}

export function ListaCadastroRegistro<T>({
    tipoDado,
    renderItem,
    titulo,
    temHospitalId,
}: ListaCadastroRegistroProps<T>) {
    const [dados, setDados] = useState<T[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [cadastroDado, setCadastroDado] = useState<Partial<T>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [tipoOperacao, setTipoOperacao] = useState<"Post" | "Put">("Post");

    async function carregarDados() {
        try {
            setIsLoading(true);
            let filterQuery = `/${tipoDado}`;
            if (temHospitalId) {
                filterQuery += `?filter=hospitalId eq ${HOSPITALID}`;
            }
            const response = await api.get(filterQuery);
            setDados(response.data.value ?? response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, [tipoDado]);

    async function onExcluir(item: T) {
        try {
            await api.delete(`/${tipoDado}/${(item as any).id}`);
            await carregarDados();
            console.log(`${tipoDado} excluído:`, item);
        } catch (err) {
            console.error("Erro ao excluir:", err);
        }
    }

    function fecharModal() {
        setShowModal(false);
        setTipoOperacao("Post");
        setCadastroDado({});
    }

    async function onEditar(item: T) {
        setShowModal(true);
        setCadastroDado({
            ...item,
        });
        setTipoOperacao("Put");
    }

    async function onSubmitCadastroDado({ tipo }: { tipo: string }) {
        let dadoFinal = { ...cadastroDado };

        if (tipoDado === "ProfissionalSaude") {
            const especialidadeResponse = await api.get(`/Especialidade?$filter=tolower(nome) eq tolower('${(cadastroDado as any).especialidadeId}')`);

            const especialidade = especialidadeResponse.data.value ?? especialidadeResponse.data ?? [];

            dadoFinal = {
                ...dadoFinal,
                especialidadeId: especialidade[0]?.id,
                hospitalId: HOSPITALID,
            };
        }

        if (tipoDado === "Sala") {
            const alaResponse = await api.get(`/Ala?$filter=tolower(nome) eq tolower('${(cadastroDado as any).alaId}')`);

            const ala = alaResponse.data.value ?? alaResponse.data ?? [];

            dadoFinal = {
                ...dadoFinal,
                alaId: ala[0]?.id,
                hospitalId: HOSPITALID
            };
        }

        if (tipoDado === "Ala") {
            dadoFinal = {
                ...dadoFinal,
                hospitalId: HOSPITALID,
            };
        }

        if (tipoDado === "Vacina") {
            const vacinaModeloResponse = await api.get(`/VacinaModelo?$filter=tolower(nome) eq tolower('${(cadastroDado as any).vacinaModeloId}')`);
            const vacinaModelo = vacinaModeloResponse.data.value ?? vacinaModeloResponse.data ?? [];

            dadoFinal = {
                ...dadoFinal,
                vacinaModeloId: vacinaModelo[0]?.id,
                hospitalId: HOSPITALID,
            };
        }

        if (tipoDado === "Quarto") {
            const alaResponse = await api.get(`/Ala?$filter=tolower(nome) eq tolower('${(cadastroDado as any).alaId}')`);

            const ala = alaResponse.data.value ?? alaResponse.data ?? [];

            dadoFinal = {
                ...dadoFinal,
                alaId: ala[0]?.id,
                hospitalId: HOSPITALID
            };
        }

        dadoFinal = {
            ...dadoFinal,
            hospitalId: HOSPITALID
        };

        try {
            if (tipo === "Post") {
                await api.post(`/${tipoDado}`, dadoFinal);
            } else {
                await api.put(`/${tipoDado}/${(cadastroDado as any).id}`, dadoFinal);
            }

            setCadastroDado({});
            setShowModal(false);
            setTipoOperacao("Post");
            await carregarDados();
        } catch (error) {
            console.error(`Erro ao ${tipo === "Post" ? "cadastrar" : "editar"} ${tipoDado}:`, error);
            alert(`Erro ao ${tipo === "Post" ? "cadastrar" : "editar"} ${tipoDado}. Tente novamente.`);
        }
    }

    function handleCadastroDadoChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = event.target;

        let valorFinal: string | number | boolean = value;

        if (name === "ocupado") {
            valorFinal = (value === "true");
            setCadastroDado(prev => ({
                ...prev,
                [name]: valorFinal,
            }));
            return;
        }

        if ((tipoDado === "Sala" || tipoDado === "Quarto" || tipoDado === "Alergia") && name === "tipo") {
            setCadastroDado(prev => ({
                ...prev,
                [name]: Number(value),
            }));
            return;
        }

        setCadastroDado((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <Modal isOpen={showModal} onClose={() => fecharModal()}>
                <h1>Cadastro de {tipoDado}</h1>

                {tipoDado === "Exame" && (
                    <>
                        <label>Nome</label>
                        <input
                            type="text"
                            required
                            onChange={handleCadastroDadoChange}
                            name="nome"
                            value={(cadastroDado as any).nome ?? ""}
                        />

                        <label>Descrição</label>
                        <textarea
                            rows={3}
                            onChange={handleCadastroDadoChange}
                            name="descricao"
                            value={(cadastroDado as any).descricao ?? ""}
                        ></textarea>
                    </>
                )}

                {tipoDado === "DoencaCronicaModelo" && (
                    <>
                        <label>Nome</label>
                        <input type="text" required onChange={handleCadastroDadoChange} name="nome" value={(cadastroDado as any).nome ?? ""} />

                        <label>CID</label>
                        <input type="text" required onChange={handleCadastroDadoChange} name="cid" value={(cadastroDado as any).cid ?? ""} />

                        <label>Descrição</label>
                        <textarea rows={4} onChange={handleCadastroDadoChange} name="descricao" value={(cadastroDado as any).descricao ?? ""}></textarea>
                    </>
                )}

                {tipoDado === "ProfissionalSaude" && (
                    <CadastroProfissional profissional={cadastroDado as any} onChangeLista={handleCadastroDadoChange} />
                )}

                {tipoDado === "Especialidade" && (
                    <>
                        <label>Nome</label>
                        <input type="text" value={(cadastroDado as any).nome ?? ""} onChange={handleCadastroDadoChange} name="nome" />
                    </>
                )}

                {tipoDado === "MedicamentoModelo" && (
                    <>
                        <label>Nome</label>
                        <input type="text" value={(cadastroDado as any).nome ?? ""} onChange={handleCadastroDadoChange} name="nome" />

                        <label>Princípio Ativo</label>
                        <input type="text" value={(cadastroDado as any).principioAtivo ?? ""} onChange={handleCadastroDadoChange} name="principioAtivo" />

                        <label>Fabricante</label>
                        <input type="text" value={(cadastroDado as any).fabricante ?? ""} onChange={handleCadastroDadoChange} name="fabricante" />

                        <label>Forma Farmacêutica</label>
                        <input type="text" value={(cadastroDado as any).formaFarmaceutica ?? ""} onChange={handleCadastroDadoChange} name="formaFarmaceutica" />

                        <label>Dosagem</label>
                        <input type="text" value={(cadastroDado as any).dosagem ?? ""} onChange={handleCadastroDadoChange} name="dosagem" />

                        <label>Indicações</label>
                        <textarea rows={3} value={(cadastroDado as any).indicacoes ?? ""} onChange={handleCadastroDadoChange} name="indicacoes"></textarea>

                        <label>Contraindicações</label>
                        <textarea rows={3} value={(cadastroDado as any).contraIndicacoes ?? ""} onChange={handleCadastroDadoChange} name="contraIndicacoes"></textarea>
                    </>
                )}

                {tipoDado === "Sala" && (
                    <CadastroSala sala={cadastroDado as any} onChangeLista={handleCadastroDadoChange} />
                )}

                {tipoDado === "Quarto" && (
                    <CadastroQuarto quarto={cadastroDado as any} onChangeLista={handleCadastroDadoChange} />
                )}

                {tipoDado === "Ala" && (
                    <>
                        <label>Nome</label>
                        <input type="text" value={(cadastroDado as any).nome ?? ""} onChange={handleCadastroDadoChange} name="nome" />
                    </>
                )}

                {tipoDado === "Vacina" && (
                    <CadastroVacina vacina={cadastroDado as any} onChangeLista={handleCadastroDadoChange} />
                )}

                {tipoDado === "VacinaModelo" && (
                    <>
                        <label>Nome</label>
                        <input type="text" value={(cadastroDado as any).nome ?? ""} onChange={handleCadastroDadoChange} name="nome" />
                        <label>Fabricante</label>
                        <input type="text" value={(cadastroDado as any).fabricante ?? ""} onChange={handleCadastroDadoChange} name="fabricante" />
                        <label>Tipo</label>
                        <input type="text" value={(cadastroDado as any).tipo ?? ""} onChange={handleCadastroDadoChange} name="tipo" />
                        <label>Indicação</label>
                        <input type="text" value={(cadastroDado as any).indicacao ?? ""} onChange={handleCadastroDadoChange} name="indicacao" />
                        <label>Número de Doses</label>
                        <input type="text" value={(cadastroDado as any).numeroDoses ?? ""} onChange={handleCadastroDadoChange} name="numeroDoses" />
                        <label>Intervalo entre Doses (dias)</label>
                        <input type="text" value={(cadastroDado as any).intervaloEntreDoses ?? ""} onChange={handleCadastroDadoChange} name="intervaloEntreDoses" />
                    </>
                )}

                {tipoDado === "Leito" && (
                    <CadastroLeito leito={cadastroDado as any} onChangeLista={handleCadastroDadoChange} />
                )}

                {tipoDado === "Alergia" && (
                    <>
                        <label>Nome</label>
                        <input type="text" value={(cadastroDado as any).nome ?? ""} onChange={handleCadastroDadoChange} name="nome" />
                        <label>Tipo</label>
                        <select name="tipo" value={(cadastroDado as any).tipo ?? ""} onChange={handleCadastroDadoChange}>
                            <option value="">Selecione o tipo</option>
                            <option value={TipoAlergia.Alimentar}>Alimentar</option>
                            <option value={TipoAlergia.Medicamentos}>Medicamentos</option>
                            <option value={TipoAlergia.Ambiental}>Ambiental</option>
                            <option value={TipoAlergia.Outra}>Outra</option>
                        </select>
                    </>
                )}

                <div className="botoes-form">
                    <button
                        type="button"
                        className="btn-editar"
                        onClick={() => onSubmitCadastroDado({ tipo: tipoOperacao })}
                    >
                        Salvar
                    </button>
                </div>
            </Modal>

            <div className="lista-pacientes">
                {titulo && <h2>{titulo}</h2>}

                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    dados.map((item, index) => (
                        <div className="paciente-card" key={index}>
                            {renderItem(item, index)}
                            <button
                                type="button"
                                className="btn-editar"
                                onClick={() => onEditar(item)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn-excluir"
                                onClick={() => onExcluir(item)}
                            >
                                Excluir
                            </button>
                        </div>
                    ))
                )}

                <button
                    type="button"
                    className="btn-salvar"
                    onClick={() => setShowModal(true)}
                >
                    Adicionar
                </button>
            </div>
        </>
    );
}
