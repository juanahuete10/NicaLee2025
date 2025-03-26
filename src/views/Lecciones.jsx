import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { db } from "../database/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

import ModalRegistroLeccion from "../components/Lecciones/ModalRegistroLeccion";
import TablaLeccion from "../components/Lecciones/TablaLeccion";
import ModalEdicionLeccion from "../components/Lecciones/ModalEdicionLeccion";
import ModalEliminacionLeccion from "../components/Lecciones/ModalEliminacionLeccion";


const Lecciones = () => {
  const [lecciones, setLecciones] = useState([]);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEdicion, setShowEdicion] = useState(false);
  const [showEliminacion, setShowEliminacion] = useState(false);
  const [leccionActual, setLeccionActual] = useState(null);

  useEffect(() => {
    const obtenerLecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lecciones"));
        setLecciones(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error al obtener lecciones:", error);
      }
    };
    obtenerLecciones();
  }, []);

  const agregarLeccion = async (nuevaLeccion) => {
    try {
      const docRef = await addDoc(collection(db, "lecciones"), nuevaLeccion);
      setLecciones([...lecciones, { id: docRef.id, ...nuevaLeccion }]); // Agregar sin recargar
    } catch (error) {
      console.error("Error al agregar lección:", error);
    }
  };

  const actualizarLeccion = async (id, datosActualizados) => {
    try {
      const leccionRef = doc(db, "lecciones", id);
      await updateDoc(leccionRef, datosActualizados);
      setLecciones(lecciones.map((lec) => (lec.id === id ? { id, ...datosActualizados } : lec)));
    } catch (error) {
      console.error("Error al actualizar lección:", error);
    }
  };

  const eliminarLeccion = async (id) => {
    try {
      const leccionRef = doc(db, "lecciones", id);
      await deleteDoc(leccionRef);
      setLecciones(lecciones.filter((lec) => lec.id !== id));
    } catch (error) {
      console.error("Error al eliminar lección:", error);
    }
  };

  return (
    <Container>
      <h1>Gestión de Lecciones</h1>
      <Button onClick={() => setShowRegistro(true)}>Agregar Lección</Button>
      <TablaLeccion
        lecciones={lecciones}
        setLeccionActual={setLeccionActual}
        setShowEdicion={setShowEdicion}
        setShowEliminacion={setShowEliminacion}
      />
      <ModalRegistroLeccion show={showRegistro} handleClose={() => setShowRegistro(false)} agregarLeccion={agregarLeccion} />
      <ModalEdicionLeccion show={showEdicion} handleClose={() => setShowEdicion(false)} leccion={leccionActual} actualizarLeccion={actualizarLeccion} />
      <ModalEliminacionLeccion show={showEliminacion} handleClose={() => setShowEliminacion(false)} leccion={leccionActual} eliminarLeccion={eliminarLeccion} />
    </Container>
  );
};

export default Lecciones;
