import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import HospitalCadastro from './pages/HospitalCadastro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hospital/cadastro" element={<HospitalCadastro />} />
    </Routes>
  )
}

export default App
