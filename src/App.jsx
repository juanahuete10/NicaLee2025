import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import InicioNicaLee from "./views/InicioNicaLee";
import Encabezado from "./components/Encabezado";
import Login from './components/Login'
import Registro from "./components/Registro";
import Lecciones from "./views/Lecciones";
import LeccionesCatalogo from "./views/LeccionesCatalogo";
import EstudianteFormularios from "./components/Formularios/EstudianteFormularios";
import EstudianteDashboard from "./components/Formularios/EstudianteDashboard";



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
                <Route path="/inicionicalee" element={<ProtectedRoute element={<InicioNicaLee />} />} />
                <Route path="/" element={<InicioNicaLee />} />
                <Route path="/lecciones" element={<ProtectedRoute element={<Lecciones />} />} />
                <Route path="/registro" element={<Registro />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/leccionescatalogo" element={<ProtectedRoute element={<LeccionesCatalogo />} />} />
                <Route path="/estudianteformularios" element={<ProtectedRoute element={<EstudianteFormularios />} />} />
                <Route path="/dashboard" element={<EstudianteDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
