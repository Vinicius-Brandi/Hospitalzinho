import './Header.css'
import { NavLink  } from "react-router";

export function Header(){
    return (
        <>
            <header>
                <a href="index.html" title="Voltar para a página inicial">
                    <img src="https://placehold.co/200x60/b30000/white?text=Secretaria Da Saude" alt="Logotipo do Sistema" />
                </a>
                
                <nav>
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home Page</NavLink></li>
                        <li><NavLink to="/hospital/lista" className={({ isActive }) => isActive ? "active" : ""}>Lista de Hospitais</NavLink></li>
                        <li><NavLink to="/hospital/cadastro" className={({ isActive }) => isActive ? "active" : ""}>Cadastro de Hospital</NavLink></li>
                        <li><NavLink to="/hospital/consulta" className={({ isActive }) => isActive ? "active" : ""}>Consulta de Hospital</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}