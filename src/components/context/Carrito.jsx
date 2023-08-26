import React, { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import "../../styles/carrito.css";
import { FaArrowCircleRight } from "react-icons/fa";

const Carrito = ({ cerrarCarrito }) => {
  const { carrito,  eliminarDelCarrito } = useContext(CarritoContext);
  const [ carro , setCarrito] = useState(carrito);
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");


  const enviarPeticion = () => {
    // Validar campos obligatorios
    if (!name || !telefono || !email) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (carrito.length === 0) {
      alert("Por favor, elija algun producto");
      return;
    }

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
      precio: ( producto.precio * producto.cantidad),
      cantidad: producto.cantidad
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

    alert("Compra solicitada", carro);

  };

  // Calcular el precio total de los productos en el carrito
  const total = carrito.reduce((accum, producto) => accum + (producto.precio * producto.cantidad), 0);

  const aumentarCantidad = (index) => {
    const newCarrito = [...carrito];
    newCarrito[index].cantidad += 1;
    setCarrito(newCarrito);
  };

  const disminuirCantidad = (index) => {
    const newCarrito = [...carrito];
    if (newCarrito[index].cantidad > 1) {
      newCarrito[index].cantidad -= 1;
      setCarrito(newCarrito);
    } else {
      eliminarDelCarrito(index);
    }
  };

  return (
    <div className="">
      <div className="iconoCarrito"><FaArrowCircleRight size="30px" onClick={cerrarCarrito} /></div>
      <form className="formCarro">
        <div className="box">
        <h6 className="boxItem">Nombre:<span className="spanNom"></span></h6>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br/>
        <h6 className="boxItem">Teléfono:<span className="spanTel"></span> </h6>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <br /></div>
        <h6 className="boxItem correo">Correo: <span className="spanCorreo"></span>  </h6>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
      </form>
      <div className="carritoItems">
      {carrito.map((producto, index) => (
        <div className="itemPro" key={producto.id}>
          <div className="itemCarro">
          <img className="imgCarro"
            src={producto.imagen}
            alt="img"/>
          <h6 className="textoCarro">
          <span>{producto.marca} {producto.modelo}</span> <br />
          <span>talle: {producto.talle}</span> <br />
          <span>color: {producto.color}</span> <br />
          <span>${producto.precio} C/U</span>
          </h6>
          </div>
          <div className="cantidadBoton">
          <button className="smallButton" onClick={() => disminuirCantidad(index)}>
                -
              </button>
              {producto.cantidad}
              <button className="smallButton" onClick={() => aumentarCantidad(index)}>
                +
              </button>
              <button className="btn btn-outline-danger" onClick={() => eliminarDelCarrito(index)}>X</button>
          </div>

        </div>
      ))}
      </div>

      <h4>Total ${total}</h4>
      <button className="btn btn-outline-success" onClick={enviarPeticion} style={{ color: "blue" }}>
        Enviar
      </button>
    </div>
  );
};

export default Carrito;
