import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { db } from "../database/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import TarjetaLeccion from "../components/CatalogoLecciones/TarjetaLeccion";  // Ajustado a TarjetaLeccion

const LeccionesCatalogo = () => {
  const [lecciones, setLecciones] = useState([]);  // Cambiado de productos a lecciones
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const leccionesCollection = collection(db, "lecciones");  // Cambiado a lecciones
  const categoriasCollection = collection(db, "categorias");

  const fetchData = async () => {
    try {
      // Obtener lecciones
      const leccionesData = await getDocs(leccionesCollection);
      const fetchedLecciones = leccionesData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLecciones(fetchedLecciones);

      // Obtener categorías
      const categoriasData = await getDocs(categoriasCollection);
      const fetchedCategorias = categoriasData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategorias(fetchedCategorias);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar lecciones por categoría
  const leccionesFiltradas = categoriaSeleccionada === "Todas"
    ? lecciones
    : lecciones.filter((leccion) => leccion.categoria === categoriaSeleccionada);

  return (
    <Container className="mt-5">
      <br />
      <h4>Catálogo de Lecciones</h4>
      {/* Filtro de categorías */}
      <Row>
        <Col lg={3} md={3} sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Filtrar por categoría:</Form.Label>
            <Form.Select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Catálogo de lecciones filtradas */}
      <Row>
        {leccionesFiltradas.length > 0 ? (
          leccionesFiltradas.map((leccion) => (
            <TarjetaLeccion key={leccion.id} leccion={leccion} />
          ))
        ) : (
          <p>No hay lecciones en esta categoría.</p>
        )}
      </Row>
    </Container>
  );
};

export default LeccionesCatalogo;
