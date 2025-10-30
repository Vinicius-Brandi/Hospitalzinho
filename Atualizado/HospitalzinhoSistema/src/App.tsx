import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { PacienteCadastro } from './pages/Paciente/PacienteCadastro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paciente/cadastro" element={<PacienteCadastro />} />
    </Routes>
  )
}

export default App
