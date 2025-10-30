import './App.css'
import { HomePage } from './pages/HomePage'
import { CadastroProntuario } from './pages/Prontuario/CadastroProntuario'
import { CadastroPaciente } from './pages/Paciente/CadastroPaciente'
import { Routes, Route } from 'react-router'
import { ConsultaProntuario } from './pages/Prontuario/ConsultaProntuario'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="prontuario/cadastro" element={<CadastroProntuario />} />
      <Route path="paciente/cadastro" element={<CadastroPaciente />} />
      <Route path="prontuario/consulta" element={<ConsultaProntuario />} />
    </Routes>
  )
}

export default App
