import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { ListaCadastroRegistro } from "./ListaCadastroRegistro";
import type { Especialidade } from "../../../models/hospital";

export function CadastroEspecialidade({abrirModal, setCloseModal} : {abrirModal: boolean, setCloseModal: (teste: boolean) => void}) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(abrirModal);
    }, [abrirModal]);

    return (
        <Modal isOpen={showModal} onClose={() => setCloseModal(false)}>
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