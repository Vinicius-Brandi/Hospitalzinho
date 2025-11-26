import { useEffect, useState } from 'react';
import './Header.css'
import { NavLink } from "react-router";
import { api } from '../../../services/api';
import { HOSPITALID } from '../../../models/hospital';

export function Header() {
    const [hospital, setHospital] = useState<any>(null);

    async function fetchHospital() {
        const response = await api.get(`/HospitalUnidade/${HOSPITALID}`)
        setHospital(response.data);
    };

    useEffect(() => {
        fetchHospital();
    }, []);

    return (
        <>
            <header>
                <a href="index.html" title="Voltar para a página inicial">
                    <img src={`https://placehold.co/275x60/0056b3/white?text=${hospital?.nome || 'Hospital'}`} alt={`Logotipo do ${hospital?.nome || 'Sistema'}`} />
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