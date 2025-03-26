import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionLeccion = ({
  showEditModal,
  setShowEditModal,
  leccionEditada,
  handleEditInputChange,
  handleEditLeccion,
}) => {
  if (!leccionEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Lección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={leccionEditada.titulo}
              onChange={handleEditInputChange}
              placeholder="Ingresa el título de la lección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="contenido"
              value={leccionEditada.contenido}
              onChange={handleEditInputChange}
              placeholder="Ingresa el contenido de la lección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Control
              type="text"
              name="nivel"
              value={leccionEditada.nivel}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nivel educativo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="categoria"
              value={leccionEditada.categoria}
              onChange={handleEditInputChange}
              placeholder="Ingresa la categoría"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Recursos</Form.Label>
            <Form.Control
              type="text"
              name="recursos"
              value={leccionEditada.recursos}
              onChange={handleEditInputChange}
              placeholder="Ingresa enlaces a recursos adicionales"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditLeccion}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionLeccion;
