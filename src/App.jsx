import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import InicioNicaLee from "./views/InicioNicaLee";
import Encabezado from "./components/Encabezado";
import Login from './components/Login'
import Registro from "./components/Registro";
import Lecciones from "./views/Lecciones";
import LeccionesCatalogo from "./views/LeccionesCatalogo";



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
            <Route path="/inicionicalee" element={<ProtectedRoute element={<InicioNicaLee/>} />} />
                <Route path="/" element={<InicioNicaLee />} />
                <Route path="/inicionicalee" element={<ProtectedRoute element={<InicioNicaLee />} />} />
                <Route path="/lecciones" element={<ProtectedRoute element={<Lecciones />} />}/>
                <Route path="/registro" element={<ProtectedRoute element={<Registro />} />}/>
                <Route path="/login" element={<ProtectedRoute element={<Login />} />}/>
                <Route path="/leccionescatalogo" element={<ProtectedRoute element={<LeccionesCatalogo />} />}/>

              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
