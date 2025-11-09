import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CadastroHospital } from './pages/CadastroHospital'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />}/>
      <Route path='/hospital/cadastro' element={<CadastroHospital />}/>
    </Routes>
  )
}

export default App
