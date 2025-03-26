import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from './views/Login'
import Encabezado from "./components/Encabezado";
import Inicio from "./views/Inicio";
import Lecciones from "./views/Lecciones";// 


import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <div className="App">
            <Encabezado />
            <main>
            <Routes>
                
                <Route path="/" element={<Login />} />
                <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
                <Route path="/lecciones" element={<ProtectedRoute element={<Lecciones />} />}/>

              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
