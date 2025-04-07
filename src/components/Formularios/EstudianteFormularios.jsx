import React, { useState } from 'react';
import styled from 'styled-components';



const EstudianteFormularios = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [grado, setGrado] = useState('');
  const [intereses, setIntereses] = useState('');
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [genero, setGenero] = useState('');
  const [imagen, setImagen] = useState(null);

  const pickImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegistro = () => {
    if (
      !nombre ||
      !apellido ||
      !edad ||
      !grado ||
      !intereses ||
      !nivelEducativo ||
      !ubicacion ||
      !genero ||
      !imagen
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const estudiante = {
      nombre,
      apellido,
      edad,
      grado,
      intereses,
      nivelEducativo,
      ubicacion,
      genero,
      imagen,
    };
    console.log('Datos registrados:', estudiante);
    alert('¡Estudiante registrado con éxito!');
  };

  return (
    <GradientContainer>
      <div className="container">
        <h2>Registro de Estudiante</h2>
        <div>
          {imagen ? (
            <img src={imagen} alt="Perfil" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          ) : (
            <p>Selecciona tu foto de perfil</p>
          )}
          <input type="file" onChange={pickImage} required />
        </div>

        <InputField
          type="text"
          placeholder="Nombres"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Apellidos"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <InputField
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />

        <SelectField value={grado} onChange={(e) => setGrado(e.target.value)} required>
          <option value="">Selecciona el grado</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </SelectField>

        <SelectField value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)} required>
          <option value="">Selecciona el nivel educativo</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Preparatoria">Preparatoria</option>
          <option value="Universidad">Universidad</option>
        </SelectField>

        <InputField
          type="text"
          placeholder="Intereses"
          value={intereses}
          onChange={(e) => setIntereses(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />

        <p>Género:</p>
        <SelectField value={genero} onChange={(e) => setGenero(e.target.value)} required>
          <option value="">Selecciona el género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </SelectField>

        <Button onClick={handleRegistro}>Registrarse</Button>
      </div>
    </GradientContainer>
  );
};

const GradientContainer = styled.div`
  background: linear-gradient(to right, #ADD8E6, #ffffff); /* Celeste combinado con blanco */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
`;

const InputField = styled.input`
  margin: 10px;
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SelectField = styled.select`
  margin: 10px;
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin: 10px;
  padding: 12px;
  background-color: rgb(24, 204, 8);
  color: white;
  width: 100%;
  max-width: 200px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color:rgb(71, 36, 228);
  }
`;

export default EstudianteFormularios;
