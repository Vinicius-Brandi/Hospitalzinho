import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { PacienteCadastro } from './pages/Paciente/PacienteCadastro'
import { AtendimentoRegistro } from './pages/Prontuario/AtendimentoRegistro'
import { AtendimentoConsulta } from './pages/Prontuario/AtendimentoConsulta'
import { PacienteLista } from './pages/Paciente/PacienteLista'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paciente/lista" element={<PacienteLista />} />

      <Route path="/paciente/cadastro" element={<PacienteCadastro />} />
      <Route path="/paciente/cadastro/:id" element={<PacienteCadastro />} />
      
      <Route path="/atendimento/registro" element={<AtendimentoRegistro />} />
      <Route path="/atendimento/consulta" element={<AtendimentoConsulta />} />
    </Routes>
  )
}

export default App
