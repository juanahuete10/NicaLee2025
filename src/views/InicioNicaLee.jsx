import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/styles.css";
import welcomeBackground from "../assets/welcome-bg.png";
import LogoNicaLee from "../assets/LogoNicaLee.png"; // Imagen de arcoíris
import bookIcon from "../assets/book-icon.png"; // Ícono de libro
import starsIcon from "../assets/stars-icon.png"; // Ícono de estrellas

const InicioNicaLee = () => {
  const navigate = useNavigate();

  return (
    <div
      className="welcome-container d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url(${welcomeBackground})`, minHeight: "100vh", backgroundSize: "cover" }}
    >
      <div className="content text-center p-4 rounded shadow bg-white bg-opacity-75">
        <img src={LogoNicaLee} alt="Logo" className="mb-3" style={{ width: "150px" }} />
        <h1 className="title">Bienvenido a <span className="text-primary">Nica Lee</span></h1>
        <p className="lead">Una plataforma educativa para mejorar la comprensión lectora en niños.</p>
        
        <div className="button-group d-grid gap-3 col-6 mx-auto mt-4">
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/registro")}>Registrarse</button>
          <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <img src={bookIcon} alt="Libro" style={{ width: "50px" }} />
          <img src={starsIcon} alt="Estrellas" style={{ width: "50px" }} />
        </div>
      </div>
    </div>
  );
};

export default InicioNicaLee;
