import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { db } from "../../src/database/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import TablaLeccion from "../components/Lecciones/TablaLeccion";
import ModalRegistroLeccion from "../components/Lecciones/ModalRegistroLeccion";
import ModalEdicionLeccion from "../components/Lecciones/ModalEdicionLeccion";
import ModalEliminacionLeccion from "../components/Lecciones/ModalEliminacionLeccion";

const Lecciones = () => {
  // Estados para manejo de datos
  const [lecciones, setLecciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaLeccion, setNuevaLeccion] = useState({
    tituloLeccion: "",
    nivel: "",
    contenido: "",
    ejercicios: "",
    fechaPublicacion: "",
    imagen: "",  // Nuevo campo para la imagen
  });
  const [leccionEditada, setLeccionEditada] = useState(null);
  const [leccionAEliminar, setLeccionAEliminar] = useState(null);

  // Referencia a las colecciones en Firestore
  const leccionesCollection = collection(db, "lecciones");

  // Función para obtener todas las lecciones de Firestore
  const fetchData = async () => {
    try {
      const leccionesData = await getDocs(leccionesCollection);
      const fetchedLecciones = leccionesData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLecciones(fetchedLecciones);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Hook useEffect para carga inicial de datos
  useEffect(() => {
    fetchData();
  }, []);

  // Manejador de cambios en inputs del formulario de nueva lección
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaLeccion((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador de cambios en inputs del formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setLeccionEditada((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador para la carga de imágenes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaLeccion((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLeccionEditada((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para agregar una nueva lección (CREATE)
  const handleAddLeccion = async () => {
    if (!nuevaLeccion.tituloLeccion || !nuevaLeccion.nivel || !nuevaLeccion.contenido) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      await addDoc(leccionesCollection, nuevaLeccion);
      setShowModal(false);
      setNuevaLeccion({
        tituloLeccion: "",
        nivel: "",
        contenido: "",
        ejercicios: "",
        fechaPublicacion: "",
        imagen: "",
      });
      await fetchData();
    } catch (error) {
      console.error("Error al agregar lección:", error);
    }
  };

  // Función para actualizar una lección existente (UPDATE)
  const handleEditLeccion = async () => {
    if (!leccionEditada.tituloLeccion || !leccionEditada.nivel || !leccionEditada.contenido) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      const leccionRef = doc(db, "lecciones", leccionEditada.id);
      await updateDoc(leccionRef, leccionEditada);
      setShowEditModal(false);
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar lección:", error);
    }
  };

  // Función para eliminar una lección (DELETE)
  const handleDeleteLeccion = async () => {
    if (leccionAEliminar) {
      try {
        const leccionRef = doc(db, "lecciones", leccionAEliminar.id);
        await deleteDoc(leccionRef);
        setShowDeleteModal(false);
        await fetchData();
      } catch (error) {
        console.error("Error al eliminar lección:", error);
      }
    }
  };

  // Función para abrir el modal de edición con datos prellenados
  const openEditModal = (leccion) => {
    setLeccionEditada({ ...leccion });
    setShowEditModal(true);
  };

  // Función para abrir el modal de eliminación
  const openDeleteModal = (leccion) => {
    setLeccionAEliminar(leccion);
    setShowDeleteModal(true);
  };

  // Renderizado del componente
  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Lecciones</h4>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar lección
      </Button>
      <TablaLeccion
        lecciones={lecciones}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <ModalRegistroLeccion
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaLeccion={nuevaLeccion}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddLeccion={handleAddLeccion}
      />
      <ModalEdicionLeccion
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        leccionEditada={leccionEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditLeccion={handleEditLeccion}
      />
      <ModalEliminacionLeccion
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteLeccion={handleDeleteLeccion}
      />
    </Container>
  );
};

export default Lecciones;
