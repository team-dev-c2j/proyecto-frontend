import React, { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import "../../styles/carrito.css"

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  const enviarPeticion = () => {
    alert('compra solicitada')
  }

  return (
    <div className="carritoForm">
      <form className="formCarro">
          <h4>nombre</h4><input type="text"/><br/>
          <h4>telefono</h4><input type="text"/><br/>
          <h4>correo</h4><input type="text"/><br/>

      </form>
      {carrito.map((producto, index) => (
        <div key={producto.id}>
          <img src={producto.imagen} alt="img" style={{marginBottom: '15px', width: '100px', height: '100px', borderRadius: '50%' }}/>
          <h3>{index + 1} {producto.modelo} talle: {producto.talle} color: {producto.color}</h3>
          <button class="btn btn-outline-danger" onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
        </div>
      ))}
      <button class="btn btn-outline-success" onClick={enviarPeticion} style={{color: 'blue'}}>Enviar peticion</button>
    </div>
  );
};

export default Carrito;
