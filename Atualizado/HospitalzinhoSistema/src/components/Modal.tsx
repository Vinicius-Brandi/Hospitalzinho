import './Modal.css';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div id="modalTipoExame" className="modal">
            <div className="modal-conteudo">
                <span className="fechar" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}