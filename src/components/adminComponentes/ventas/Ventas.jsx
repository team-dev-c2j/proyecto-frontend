import AddVenta from "./addVenta";
import React, { useEffect, useState, useCallback } from "react";
import "../../../styles/ventas.css";
import MyCalendar from "../../utils/Calendar";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [date, setDate] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [ventasCargadas, setVentasCargadas] = useState(false);

  const obtenerVentas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/ventas");
      const data = await response.json();
      setVentas(data.results);
      setVentasCargadas(true);
    } catch (error) {
      console.error(error);
      setVentasCargadas(false);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  const eliminarVenta = async (ventaId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta venta?");
    if (confirmDelete) {
      try {
        await fetch(`http://127.0.0.1:3000/ventas/${ventaId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
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

  const obtenerFecha = (fecha) => {
    if (!fecha || isNaN(new Date(fecha))) {
      return "Fecha inválida";
    }
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const handleDateSelected = useCallback((date) => {
    const ventasPorFecha = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.createdAt).toLocaleDateString();
      const fechaSeleccionada = date.toLocaleDateString();
      return fechaVenta === fechaSeleccionada;
    });

    const total = ventas.reduce((acc, venta) => acc + venta.total, 0);
    setSumaTotal(total);
    setDate(date);
    setVentasFiltradas(ventasPorFecha);
    const totalFiltrado = ventasPorFecha.reduce((acc, venta) => acc + venta.total, 0);
    setSumaTotal(totalFiltrado);
  }, [ventas]);

  useEffect(() => {
    if (ventasCargadas) {
      handleDateSelected(new Date());
    }
  }, [ventasCargadas, handleDateSelected]);

  const reload = async () => {
    await obtenerVentas().then(handleDateSelected(date))
  };

  return (
    <div>
        <AddVenta></AddVenta>
        <MyCalendar className="calendar-container" onDateSelected={handleDateSelected} />
        <button className="actualizarVentas" onClick={reload}>Actualizar Ventas</button>
        <div className="ventasCompraMain">
        <h2 className="ventasCompra">Ventas</h2>
        <table className="ventasCompraTable">
            <thead>
            <tr>
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {ventasFiltradas.map((venta) => (
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
                <td>{obtenerFecha(venta.createdAt)}</td>
                <td>
                    <button className="X"  onClick={() => eliminarVenta(venta._id)}>
                    X
                    </button>
                </td>
                </tr>
            ))}
            </tbody>

        </table>
        <h3 className="sumaTotal">Suma total: ${sumaTotal}</h3>
        </div>
        
    </div>

  );
};
 
export default Ventas;
