import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaLeccion = ({ lecciones, openEditModal, openDeleteModal }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Título</th>
          <th>Nivel</th>
          <th>Contenido</th>
          <th>Ejercicios</th>
          <th>Fecha de Publicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {lecciones.map((leccion) => (
          <tr key={leccion.id_leccion}>
            <td>{leccion.tituloLeccion}</td>
            <td>{leccion.nivel}</td>
            <td>{leccion.contenido}</td>
            <td>{leccion.ejercicios}</td>
            <td>{leccion.fechaPublicacion}</td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(leccion)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => openDeleteModal(leccion)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaLeccion;
