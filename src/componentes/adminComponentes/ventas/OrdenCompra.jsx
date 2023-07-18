import React, { useEffect, useState } from "react";
import "../../../styles/ordenCompra.css"

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/ordenCompra")
      .then((response) => response.json())
      .then((data) => {
        setOrdenes(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarOrden = (ordenId) => {
    fetch(`http://127.0.0.1:3000/ordenCompra/${ordenId}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de órdenes después de eliminar
        setOrdenes((prevOrdenes) => prevOrdenes.filter((orden) => orden._id !== ordenId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const finalizarOrden = (ordenId) => {
    fetch(`http://127.0.0.1:3000/ordenCompra/${ordenId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ estado: "finalizado" })
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar la lista de órdenes después de cambiar el estado
        setOrdenes((prevOrdenes) => {
          return prevOrdenes.map((orden) => {
            if (orden._id === ordenId) {
              return { ...orden, estado: "finalizado" };
            } else {
              return orden;
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const obtenerFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString();
    return fechaFormateada;
  };

  return (
    <div className="ordenCompraMain">
      <h2 className="ordenCompra">Órdenes de Compra</h2>
      <table className="ordenCompraTable">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden._id}>
              <td>{orden.cliente.name}</td>
              <td>{orden.cliente.telefono}</td>
              <td>{orden.cliente.email}</td>
              <td>
                {orden.productos.map((producto) => (
                  <div key={producto._id}>
                    Modelo: {producto.modelo}, Talle: {producto.talle}, Color: {producto.color}
                  </div>
                ))}
              </td>
              <td>{orden.estado}</td>
              <td>{obtenerFecha(orden.createdAt)}</td>
              <td>
                {orden.estado === "pendiente" && (
                  <button className="✔" onClick={() => finalizarOrden(orden._id)}>✔</button>
                )}
                <button className="X" onClick={() => eliminarOrden(orden._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenesCompra;