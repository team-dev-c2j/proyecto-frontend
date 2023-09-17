import React, { useEffect, useState } from "react";
import { seeContactosRquest, deleteContactoRequest } from "../../api/contacto.jsx";
import "../../../styles/contactosPanel.css";

const ContactosPanel = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const res = await seeContactosRquest();
        setContactos(res.data);
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    };
    fetchContactos();
  }, []);

  const eliminarContacto = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta solicitud?");
    if (!confirmDelete) return
    try {
      await deleteContactoRequest(id);
      // Después de eliminar el contacto, actualiza la lista de contactos
      setContactos((prevContactos) => prevContactos.filter((contacto) => contacto._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const obtenerFecha = (fecha) => {
    if (!fecha || isNaN(new Date(fecha))) {
      return "Fecha inválida";
    }
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  
  

  return (
    <div className="contactosMain">
      <h2 className="contactosTitle">Solicitudes de contacto</h2>
      <table className="contactosTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto) => (
            <tr key={contacto._id}>
              <td>{contacto.name}</td>
              <td>{contacto.telefono}</td>
              <td>{contacto.email}</td>
              <td className="mensaje">{contacto.mensaje}</td>
              <td>{obtenerFecha(contacto.createdAt)}</td>
              <td>
                <button className="X" onClick={() => eliminarContacto(contacto._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactosPanel;
