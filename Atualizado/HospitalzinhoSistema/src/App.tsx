import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { PacienteCadastro } from './pages/Paciente/PacienteCadastro'
import { AntendimentoRegistro } from './pages/Prontuario/AntendimentoRegistro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paciente/cadastro" element={<PacienteCadastro />} />
      <Route path="/atendimento/registro" element={<AntendimentoRegistro />} />
    </Routes>
  )
}

export default App
