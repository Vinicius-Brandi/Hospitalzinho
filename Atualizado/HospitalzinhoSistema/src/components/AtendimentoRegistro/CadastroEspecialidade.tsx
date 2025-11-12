import { useState } from "react";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { Especialidade } from "../../../models/hospital";

export function CadastroEspecialidae() {
    const [showModal, setShowModal] = useState(false);
    const [especialidade, setEspecialidade] = useState<Especialidade | null>(null);

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ListaCadastroRegistro<Especialidade>
                tipoDado="Especialidade"
                titulo="Lista de Especialidades"
                renderItem={(especialidade) => (
                    <>
                        <div className="paciente-info">
                            <h3>{especialidade.nome}</h3>
                        </div>

                    </>
                )}
            />
        </Modal>

    )
}