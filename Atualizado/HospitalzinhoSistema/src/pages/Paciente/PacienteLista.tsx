import { Header } from "../../components/HeaderAndFooter/Header"
import { Footer } from "../../components/HeaderAndFooter/Footer"
import '../Prontuario/PacienteCadastro.css';
import './PacienteLista.css';
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import type { Paciente } from "../../../models/paciente";
import { useNavigate } from "react-router";

export function PacienteLista() {
    const [pacientes, setPacientes] = useState<Partial<Paciente>[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPacientes() {
            try {
                const paciente = await api.get('/Paciente');
                setPacientes(paciente.data);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        }
        fetchPacientes();
    }, []);

    function formatarData(dataString?: string) {
        if (!dataString) return "Não informada";
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }

    async function handleDeletePaciente(id?: number) {
        try {
            await api.delete(`/Paciente/${id}`);
            setPacientes(prevPacientes => prevPacientes.filter(p => p.id !== id));
        } catch (error) {
            console.error('Erro ao deletar paciente:', error);
        }
    }

    function handleEditar(id?: number) {
        if (id) {
            navigate(`/paciente/cadastro/${id}`);
        }
    }

    return (
        <>
            <Header />
            <main>
                <h1>Lista de Pacientes</h1>

                <div className="campo-pesquisa">
                    <input type="text" placeholder="Pesquisar paciente..." />
                    <button>Buscar</button>
                </div>

                <section className="section-lista-pacientes">
                    <div className="lista-pacientes">

                        {pacientes.map((paciente) => (
                            <div className="paciente-card" key={paciente.cpf}>
                                <div className="paciente-info">
                                    <h3>{paciente.nome}</h3>
                                    <p><strong>CPF:</strong> {paciente.cpf}</p>
                                    <p><strong>Data de Nascimento:</strong> {formatarData(paciente.dataNascimento)} </p>
                                    <p><strong>Telefone:</strong> {paciente.contatos?.[0]?.telefoneCelular ?? paciente.contatos?.[0]?.telefoneResidencial}</p>
                                </div>
                                <div className="botoes-acoes">
                                    <button className="btn-editar" onClick={() => handleEditar(paciente.id)}>Editar</button>
                                    <button className="btn-excluir" onClick={() => handleDeletePaciente(paciente.id)}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}