import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { HOSPITALID, type Medicamento } from "../../../models/hospital";

export function ListaMedicamentos() {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);

    function formatDate(dateString: string | undefined) {
        if (!dateString) return "Data não informada";
        try {
            return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        } catch (e) {
            return dateString;
        }
    }

    useEffect(() => {
        fetchMedicamentos();
    }, []);

    async function fetchMedicamentos() {
        const response = await api.get(`/Medicamento?filter=hospitalId eq ${HOSPITALID}`);
        setMedicamentos(response.data);
    }

    return (
        <>
            <section className="card resultados-card">
                <h2>Resultados</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Lote</th>
                                <th>Medicamento Modelo</th>
                                <th>Estoque Atual</th>
                                <th>Data Fabricacao</th>
                                <th>Vencimento Próximo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicamentos.map((medicamento) => (
                                <tr key={medicamento.lote}>
                                    <td>{medicamento.lote}</td>
                                    <td>{medicamento.modelo.nome}</td>
                                    <td>{medicamento.quantidadeDisponivel}</td>
                                    <td>{formatDate(medicamento.dataFabricacao)}</td>
                                    <td>{formatDate(medicamento.dataValidade)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}