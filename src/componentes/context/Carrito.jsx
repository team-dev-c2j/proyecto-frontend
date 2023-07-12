import React, { useContext } from "react";
import { CarritoContext } from "./CarritoContext";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  return (
    <div>
      {/* Renderizado del carrito de compras */}
      {carrito.map((producto, index) => (
        <div key={producto.id}>
          <h3>{index + 1} {producto.modelo} talle:{producto.talle} color:{producto.color}</h3>
          <button onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;
