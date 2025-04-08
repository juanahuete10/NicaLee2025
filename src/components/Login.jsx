import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../src/styles.css";
import LogoNicaLee from "../assets/LogoNicaLee.png";
import loginBg from "../assets/login-bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/estudiantedashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div 
      className="auth-container d-flex flex-column align-items-center justify-content-center vh-100" 
      style={{ 
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center"
      }}
    >
      <img src={LogoNicaLee} alt="Logo" className="mb-4" style={{ width: "150px" }} />
      <div className="content">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input 
            className="form-control mb-2" 
            type="email" 
            placeholder="Correo Electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="form-control mb-3" 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="btn btn-primary btn-lg w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
