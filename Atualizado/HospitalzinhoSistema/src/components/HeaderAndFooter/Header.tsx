import './Header.css'
import { NavLink  } from "react-router";

export function Header(){
    return (
        <>
            <header>
                <a href="index.html" title="Voltar para a página inicial">
                    <img src="https://placehold.co/200x60/0056b3/white?text=Hospital 1" alt="Logotipo do Sistema" />
                </a>
                
                <nav>
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home Page</NavLink></li>
                        <li><NavLink to="/paciente/lista" className={({ isActive }) => isActive ? "active" : ""}>Lista de Pacientes</NavLink></li>
                        <li><NavLink to="/paciente/cadastro" className={({ isActive }) => isActive ? "active" : ""}>Cadastro de Paciente</NavLink></li>
                        <li><NavLink to="/atendimento/registro" className={({ isActive }) => isActive ? "active" : ""}>Registro de Atendimento</NavLink></li>
                        <li><NavLink to="/atendimento/consulta" className={({ isActive }) => isActive ? "active" : ""}>Consulta de Atendimento</NavLink></li>
                        <li><NavLink to="/medicamento/estoque" className={({ isActive }) => isActive ? "active" : ""}>Estoque de Medicamentos</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}