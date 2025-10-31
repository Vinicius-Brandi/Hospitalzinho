import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { PacienteCadastro } from './pages/Paciente/PacienteCadastro'
import { ProntuarioCadastro } from './pages/Prontuario/ProntuarioCadastro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paciente/cadastro" element={<PacienteCadastro />} />
      <Route path="/prontuario/cadastro" element={<ProntuarioCadastro />} />
    </Routes>
  )
}

export default App
