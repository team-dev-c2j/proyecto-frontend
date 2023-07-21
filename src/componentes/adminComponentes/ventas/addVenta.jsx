import React, { useState, useEffect } from 'react';
import "../../../styles/addVentas.css"

const VentasForm = () => {
  const [vendedor, setVendedor] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({
    modelo: '',
    marca: '',
    talle: '',
    color: '',
    precio: 0,
  });
  const [comentarios, setComentarios] = useState('');
  const [estado, setEstado] = useState('pendiente')
  const [total, setTotal] = useState(0);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name === "precio") {
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: parseFloat(value) }));
    } else {
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };
  const handleAddProduct = () => {
    setProductos((prevProducts) => [...prevProducts, productoActual]);
    setProductoActual({
      modelo: '',
      marca: '',
      talle: '',
      color: '',
      precio: 0,
    });
  };

  useEffect(() => {
    const calculatedTotal = productos.reduce((acc, producto) => acc + producto.precio, 0);
    setTotal(calculatedTotal);
  }, [productos]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (productos.length === 0) {
        alert('Debes agregar al menos un producto antes de enviar la venta.');
        return;
      }

    const newVenta = {
      vendedor,
      cliente: {
        name: nombreCliente,
        telefono: telefonoCliente,
        email: emailCliente,
      },
      productos,
      comentarios,
      estado,
      total,
    };

    // Replace 'YOUR_BACKEND_API_URL' with your actual backend API URL.
    fetch('http://localhost:3000/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVenta),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed.
        console.log(data);
        // Reset form fields after successful submission if required.
         setVendedor('');
         setNombreCliente('');
         setTelefonoCliente('');
         setEmailCliente('');
         setProductos([]);
         setComentarios('');
         setTotal(0);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      alert('Venta agregada exitosamente');

      // Restablecer los campos del formulario
      window.location.reload();
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };

  function toggleButton() {
    var button = document.getElementById("toggleButton");
    if (button.checked) {
      alert("Encendido");
      // Aquí puedes agregar la lógica que se ejecutará cuando el botón esté encendido.
    } else {
      alert("Apagado")};
    }

  return (
    <div className='addVentasMain'>
      <div>
        <label htmlFor="vendedor">Vendedor:</label>
        <input
          type="text"
          id="vendedor"
          value={vendedor}
          onChange={(e) => setVendedor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nombreCliente">Nombre Cliente:</label>
        <input
          type="text"
          id="nombreCliente"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
                <label htmlFor="telefonoCliente">Teléfono:</label>
        <input
          type="text"
          id="telefonoCliente"
          value={telefonoCliente}
          onChange={(e) => setTelefonoCliente(e.target.value)}
        />
                <label htmlFor="emailCliente">Email:</label>
        <input
          type="email"
          id="emailCliente"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
        />
      </div>

      {/* Product Details */}
      <div>
        <label htmlFor="modelo">Modelo Producto:</label>
        <input
          type="text"
          name="modelo"
          value={productoActual.modelo}
          onChange={handleProductChange}
        />
                <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          name="marca"
          value={productoActual.marca}
          onChange={handleProductChange}
        />
                <label htmlFor="talle">Talle:</label>
        <input
          type="text"
          name="talle"
          value={productoActual.talle}
          onChange={handleProductChange}
        />
                <label htmlFor="color">Color:</label>
        <input
          type="text"
          name="color"
          value={productoActual.color}
          onChange={handleProductChange}
        />
                <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          name="precio"
          value={productoActual.precio}
          onChange={handleProductChange}
        />
      </div>

      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>

      {/* Product List */}
      {productos.map((producto, index) => (
        <div className="productosLista" key={index}>
          <hr />
          <p className='itemLista'>Product {index + 1}</p>
          <p className='itemLista'>Modelo: {producto.modelo}</p>
          <p className='itemLista'>Marca: {producto.marca}</p>
          <p className='itemLista'>Talle: {producto.talle}</p>
          <p className='itemLista'>Color: {producto.color}</p>
          <p className='itemLista'>Precio: {producto.precio}</p>
        </div>
      ))}
      <div>
      <select id="estado" onChange={handleEstadoChange}>
        <option value="pendiente">Pendiente</option>
        <option value="finalizado">Finalizado</option>
      </select>
      </div>
      <div>
        <label>
          <h5>descontar del stock</h5><input type="checkbox" id="toggleButton" onClick={toggleButton}/> 
        </label>
        </div>
      <div>
        <label htmlFor="comentarios">Comentarios:</label>
        <textarea
          id="comentarios"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="total">Total: {total}</label>
      </div>
      <button onClick={handleSubmit} type="submit">Submit</button>
    </div>

  );
};

export default VentasForm;
