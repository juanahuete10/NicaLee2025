import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Función que manejará el agregar lección (Simulamos la función con Firebase o similar)
const agregarLeccion = async (nuevaLeccion) => {
  try {
    // Aquí puedes agregar la lógica para guardar la lección en Firebase Firestore o cualquier otra base de datos
    console.log("Guardando lección:", nuevaLeccion);
    // Ejemplo de lógica con Firestore (si estuvieras usando Firestore):
    // await firestore.collection("lecciones").add(nuevaLeccion);
    alert("Lección guardada correctamente");
  } catch (error) {
    console.error("Error al guardar la lección:", error);
    alert("Error al guardar la lección.");
  }
};

const ModalRegistroLeccion = ({ show, handleClose }) => {
  const [nuevaLeccion, setNuevaLeccion] = useState({
    id_leccion: "", // Se puede generar automáticamente si es necesario
    tituloLeccion: "",
    nivel: "",
    contenido: "",
    ejercicios: "",
    fechaPublicacion: "",
  });

  const handleChange = (e) => {
    setNuevaLeccion({ ...nuevaLeccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tituloLeccion, nivel, contenido, ejercicios, fechaPublicacion } = nuevaLeccion;

    if (!tituloLeccion.trim() || !nivel.trim() || !contenido.trim() || !ejercicios.trim() || !fechaPublicacion.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Llamamos a la función para agregar la lección
    await agregarLeccion(nuevaLeccion);

    // Limpiar los campos del formulario
    setNuevaLeccion({
      id_leccion: "",
      tituloLeccion: "",
      nivel: "",
      contenido: "",
      ejercicios: "",
      fechaPublicacion: "",
    });

    // Cerrar el modal
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Lección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título de la Lección</Form.Label>
            <Form.Control
              type="text"
              name="tituloLeccion"
              value={nuevaLeccion.tituloLeccion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Select name="nivel" value={nuevaLeccion.nivel} onChange={handleChange} required>
              <option value="">Seleccione un nivel</option>
              <option value="Preescolar">Preescolar</option>
              <option value="Primero">Primero</option>
              <option value="Segundo">Segundo</option>
              <option value="Tercero">Tercero</option>
              <option value="Cuarto">Cuarto</option>
              <option value="Quinto">Quinto</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              name="contenido"
              value={nuevaLeccion.contenido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ejercicios</Form.Label>
            <Form.Control
              as="textarea"
              name="ejercicios"
              value={nuevaLeccion.ejercicios}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Publicación</Form.Label>
            <Form.Control
              type="date"
              name="fechaPublicacion"
              value={nuevaLeccion.fechaPublicacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistroLeccion;
