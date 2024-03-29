import React, { useEffect, useState } from "react";
import "../../../styles/ordenCompra.css"

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/ordenCompra`)
      .then((response) => response.json())
      .then((data) => {
        setOrdenes(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarOrden = async (ordenId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta orden de compra?");
    if (confirmDelete) {
      try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/ordenCompra/${ordenId}`, {
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
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const finalizarOrden = async (ordenId) => {
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/ordenCompra/${ordenId}`, {
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
        });
    } catch (error) {
      console.error(error);
    }
  };

  const pendienteOrden = async (ordenId) => {
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/ordenCompra/${ordenId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ estado: "pendiente" })
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de órdenes después de cambiar el estado
          setOrdenes((prevOrdenes) => {
            return prevOrdenes.map((orden) => {
              if (orden._id === ordenId) {
                return { ...orden, estado: "pendiente" };
              } else {
                return orden;
              }
            });
          });
        });
    } catch (error) {
      console.error(error);
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
    <div className="ordenCompraMain">
      <h2 className="ordenCompra">Órdenes de Compra</h2>
      <table className="ordenCompraTable">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Productos</th>
            <th>Total</th>
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
                    {producto.marca} {producto.modelo} Talle: {producto.talle} Color: {producto.color} Cantidad: {producto.cantidad} Precio: ${producto.precio}
                  </div>
                ))}
              </td>
              <td>${orden.total}</td>
              <td>{orden.estado}</td>
              <td>{obtenerFecha(orden.createdAt)}</td>
              <td>
              {orden.estado === "finalizado" && (
                  <button className="✔" onClick={() => pendienteOrden(orden._id)}>✔</button>
                )}
                {orden.estado === "pendiente" && (
                  <button className="pendiente" onClick={() => finalizarOrden(orden._id)}>*</button>
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
