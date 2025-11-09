import './Header.css'
import { NavLink  } from "react-router";

export function Header(){
    return (
        <>
            <header>
                <a href="index.html" title="Voltar para a página inicial">
                    <img src="https://placehold.co/200x60/0056b3/white?text=LOGO" alt="Logotipo do Sistema" />
                </a>
                
                <nav>
                    <ul>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home Page</NavLink></li>
                        <li><NavLink to="/hospital/cadastro" className={({ isActive }) => isActive ? "active" : ""}>Home Page</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}