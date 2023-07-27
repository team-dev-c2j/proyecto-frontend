import AddVenta from "./addVenta";
import React, { useEffect, useState } from "react";
import "../../../styles/ventas.css"

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/ventas")
      .then((response) => response.json())
      .then((data) => {
        setVentas(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarVenta = async (ventaId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta venta?");
    if (confirmDelete) {
      try {
        await fetch(`http://127.0.0.1:3000/venta/${ventaId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            // Actualizar la lista de órdenes después de eliminar
            setVentas((prevVentas) => prevVentas.filter((venta) => venta._id !== ventaId));
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const finalizarVenta = async (ventaId) => {
    try {
      await fetch(`http://127.0.0.1:3000/ventas/${ventaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "finalizado" }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de órdenes después de cambiar el estado
          setVentas((prevVentas) => {
            return prevVentas.map((venta) => {
              if (venta._id === ventaId) {
                return { ...venta, estado: "finalizado" };
              } else {
                return venta;
              }
            });
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const pendienteVenta = async (ventaId) => {
    try {
      await fetch(`http://127.0.0.1:3000/ventas/${ventaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "pendiente" }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar la lista de órdenes después de cambiar el estado
          setVentas((prevVentas) => {
            return prevVentas.map((venta) => {
              if (venta._id === ventaId) {
                return { ...venta, estado: "pendiente" };
              } else {
                return venta;
              }
            });
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString();
    return fechaFormateada;
  };

  return (
    <div>
        <AddVenta></AddVenta>
        <div className="ventasCompraMain">
        <h2 className="ventasCompra">Ventas</h2>
        <table className="ventasCompraTable">
            <thead>
            <tr>
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {ventas.map((venta) => (
                <tr key={venta._id}>
                  <td>{venta.vendedor}</td>
                <td>{venta.cliente.name} tel: {venta.cliente.telefono} <br/>
                {venta.cliente.email}</td>
                <td>
                    {venta.productos.map((producto) => (
                    <div key={producto._id}>
                        {producto.marca} {producto.modelo} Talle: {producto.talle} Color: {producto.color} Precio: ${producto.precio}
                    </div>
                    ))}
                </td>
                <td>${venta.total}</td>
                <td>{venta.estado}</td>
                <td>{obtenerFecha(venta.createdAt)}</td>
                <td>
                    {venta.estado === "finalizado" && (
                    <button className="✔" onClick={() => pendienteVenta(venta._id)}>
                        *
                    </button>
                    )}
                    {venta.estado === "pendiente" && (
                    <button className="✔" onClick={() => finalizarVenta(venta._id)}>
                        ✔
                    </button>
                    )}
                    <button className="X"  onClick={() => eliminarVenta(venta._id)}>
                    X
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>

  );
};

export default Ventas;
