import React, { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import "../../styles/carrito.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const enviarPeticion = () => {
    // Validar campos obligatorios
    if (!name || !telefono || !email) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Crear objeto con los datos del cliente
    const cliente = {
      name,
      telefono,
      email
    };

    // Crear arreglo de productos
    const productos = carrito.map((producto) => ({
      marca: producto.marca,
      modelo: producto.modelo,
      talle: producto.talle,
      color: producto.color,
      precio: producto.precio
    }));

    const estado = "pendiente";

    // Realizar solicitud al backend con los datos del cliente y productos
    fetch("http://127.0.0.1:3000/ordenCompra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cliente, productos, total, estado })
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del backend
        console.log(data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error(error);
      });

    alert("Compra solicitada");
  };

  // Calcular el precio total de los productos en el carrito
  const total = carrito.reduce((accum, producto) => accum + producto.precio, 0);

  return (
    <div className="carritoForm">
      <form className="formCarro">
        <h4>Nombre</h4>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <h4>Teléfono</h4>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <br />
        <h4>Correo</h4>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
      </form>
      {carrito.map((producto, index) => (
        <div key={producto.id}>
          <img
            src={producto.imagen}
            alt="img"
            style={{ marginBottom: "15px", width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h3>
            {index + 1} {producto.marca} {producto.modelo} talle: {producto.talle} color: {producto.color} precio: {producto.precio}
          </h3>
          <button className="btn btn-outline-danger" onClick={() => eliminarDelCarrito(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <h3>Total: {total}</h3>
      <button className="btn btn-outline-success" onClick={enviarPeticion} style={{ color: "blue" }}>
        Enviar petición
      </button>
    </div>
  );
};

export default Carrito;
