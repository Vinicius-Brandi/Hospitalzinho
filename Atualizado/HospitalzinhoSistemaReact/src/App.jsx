import './App.css'
import { HomePage } from './pages/HomePage'
import { CadastroProntuario } from './pages/Prontuario/CadastroProntuario'
import { CadastroPaciente } from './pages/Paciente/CadastroPaciente'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="prontuario/cadastro" element={<CadastroProntuario />} />
      <Route path="paciente/cadastro" element={<CadastroPaciente />} />
    </Routes>
  )
}

export default App
