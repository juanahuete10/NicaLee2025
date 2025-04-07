import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const EstudianteDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const estudiante = location.state?.estudiante;

  if (!estudiante) {
    return <p>No se encontraron datos del estudiante.</p>;
  }

  return (
    <Container>
      <Header>
        <img src={estudiante.imagen} alt="Perfil" />
        <h2>¡Hola, {estudiante.nombre}!</h2>
      </Header>

      <Menu>
        <Button onClick={() => alert("Perfil próximamente...")}>Ver Perfil</Button>
        <Button onClick={() => alert("Sección aún no disponible")}>Mis Cursos</Button>
        <Button onClick={() => alert("Sección aún no disponible")}>Configuración</Button>
        <Button onClick={() => navigate('/')}>Cerrar Sesión</Button>
      </Menu>
    </Container>
  );
};

export default EstudianteDashboard;

const Container = styled.div`
  padding: 30px;
  text-align: center;
  background: linear-gradient(to bottom right, #e0f7fa, #ffffff);
  min-height: 100vh;
`;

const Header = styled.div`
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  h2 {
    color: #333;
  }
`;

const Menu = styled.div`
  margin-top: 30px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 15px 25px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
