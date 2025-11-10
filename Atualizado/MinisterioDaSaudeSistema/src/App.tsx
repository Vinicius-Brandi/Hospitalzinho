import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import HospitalCadastro from './pages/HospitalCadastro'
import HospitalConsulta from './pages/HospitalConsulta'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hospital/cadastro" element={<HospitalCadastro />} />
      <Route path="/hospital/consulta" element={<HospitalConsulta />} />
    </Routes>
  )
}

export default App
