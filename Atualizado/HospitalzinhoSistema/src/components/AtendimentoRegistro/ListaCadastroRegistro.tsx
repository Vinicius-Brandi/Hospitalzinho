import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Modal } from "../Modal";

interface ListaCadastroRegistroProps<T> {
    tipoDado: string;
    renderItem: (item: T, index: number) => React.ReactNode;
    titulo?: string;
}

export function ListaCadastroRegistro<T>({
    tipoDado,
    renderItem,
    titulo,
}: ListaCadastroRegistroProps<T>) {
    const [dados, setDados] = useState<T[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [cadastroDado, setCadastroDado] = useState<Partial<T>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [tipoOperacao, setTipoOperacao] = useState<"Post" | "Put">("Post");

    async function carregarDados() {
        try {
            setIsLoading(true);
            const response = await api.get(`/${tipoDado}`);
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
        if (tipo === "Post") {
            try {
                await api.post(`/${tipoDado}`, cadastroDado);
                setCadastroDado({});
                setShowModal(false);
                await carregarDados();
            } catch (error) {
                console.error(`Erro ao cadastrar ${tipoDado}:`, error);
                alert(`Erro ao cadastrar ${tipoDado}. Tente novamente.`);
            }
        } else if (tipo === "Put") {
            try {
                await api.put(`/${tipoDado}/${(cadastroDado as any).id}`, cadastroDado);
                setCadastroDado({});
                setShowModal(false);
                setTipoOperacao("Post");
                await carregarDados();
            } catch (error) {
                console.error(`Erro ao editar ${tipoDado}:`, error);
                alert(`Erro ao editar ${tipoDado}. Tente novamente.`);
            }
        }
    }

    function handleCadastroDadoChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = event.target;
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

                {tipoDado === "Profissional" && (
                    <>
                        <label>Nome</label>
                        <input type="text" required />

                        <label>Registro Profissional</label>
                        <input type="text" required />

                        <label>Especialidade</label>
                        <input type="text" required />

                        <label>Hospital / Unidade</label>
                        <input type="text" required />

                        <div className="botoes-form">
                            <button type="submit" className="btn-editar">Salvar</button>
                        </div>
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
