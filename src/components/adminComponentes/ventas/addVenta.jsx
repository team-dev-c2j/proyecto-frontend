import React, { useState, useEffect } from 'react';
import "../../../styles/addVentas.css"
import { useAuth } from '../../context/AuthContext';
import { getMarcasRequest } from '../../api/marcas';
import { getModelosRequest } from '../../api/modelos';
import { getColoresRequest, deleteStockRequest } from '../../api/unidades';

const VentasForm = () => {
  const [vendedor, setVendedor] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({
    unidades: 1,
    modelo: '',
    marca: '',
    talle: '',
    color: '',
    precio: 0,
  });
  const [total, setTotal] = useState(0);
  const { userNav } = useAuth()
  const [ marcasApi, setMarcasApi ] = useState([])
  const [modelosApi, setModelosApi] = useState([]);
  const [coloresApi, setColoresApi] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState('');


  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const mar = await getMarcasRequest();
        if (Array.isArray(mar.results)) {
          setMarcasApi(mar.results);
        } else {
          console.error('La respuesta de la API no es un array:', mar);
        }
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
      }
    };
  
    fetchMarcas();
    
  }, []);
 

  useEffect(() => {
    setVendedor(userNav);
  }, [userNav]);


  const handleMarcaChange = (value) => {
    const selectedMarca = marcasApi.find((marcaObj) => marcaObj._id === value);
    if (selectedMarca) {
      setProductoActual((prevProduct) => ({
        ...prevProduct,
        marca: selectedMarca.marca, // Establece solo el nombre de la marca
        modelo: '',
        color: '',
        talle: '',
      }));
      obtenerModelos(selectedMarca.marca);
    } else {
      setProductoActual((prevProduct) => ({
        ...prevProduct,
        marca: value, // Si la marca no se encuentra en el array, establece el valor directamente
        modelo: '',
        color: '',
        talle: '',
      }));
    }
  };
  
  
  const obtenerModelos = async (marca) => {
    try {
      const modelos = await getModelosRequest(marca);
      if (Array.isArray(modelos)) {
        setModelosApi(modelos);
      } else {
        console.error('La respuesta de la API de modelos no es un array:', modelos);
      }
    } catch (error) {
      console.error('Error al obtener los modelos:', error);
    }
  };
  
  const handleModeloChange = async (value) => {
    const selectedModelo = modelosApi.find((modeloObj) => modeloObj.modelo === value);
    if (selectedModelo) {
      setProductoActual((prevProduct) => ({
        ...prevProduct,
        modelo: value,
        precio: selectedModelo.precio,
        color: '',
        talle: '',
      }));
      obtenerColores(productoActual.marca, value);
    } else {
      setProductoActual((prevProduct) => ({
        ...prevProduct,
        modelo: value,
        precio: 0,
        color: '',
        talle: '',
      }));
    }
  };
  
  const obtenerColores = async (marca, modelo) => {
    try {
      const colores = await getColoresRequest(marca, modelo);
      setColoresApi(colores);
      setColorSeleccionado('');
    } catch (error) {
      console.error('Error al obtener los colores:', error);
    }
  };
  
  const handleColorChange = (value) => {
    setProductoActual((prevProduct) => ({ ...prevProduct, color: value, talle: '' }));
  };
  
  const handleTalleChange = (value) => {
    setProductoActual((prevProduct) => ({ ...prevProduct, talle: value }));
  };
  
  const handlePrecioChange = (value) => {
    setProductoActual((prevProduct) => ({ ...prevProduct, precio: parseFloat(value) }));
  };
  
  const handleProductChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "marca") {
      console.log(value)
      handleMarcaChange(value);
    } else if (name === "modelo") {
      handleModeloChange(value);
    } else if (name === "color") {
      handleColorChange(value);
    } else if (name === "talle") {
      handleTalleChange(value);
    } else if (name === "precio") {
      handlePrecioChange(value);
    } else {
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };
  

  
  
  const handleAddProduct = () => {
    // Agregar directamente productoActual a la lista de productos
    setProductos((prevProducts) => [
      ...prevProducts,
      { ...productoActual, color: colorSeleccionado }, // Usar el estado colorSeleccionado
    ]);
  
    // Reiniciar productoActual
    setProductoActual({
      unidades: 1,
      modelo: '',
      marca: '',
      talle: '',
      color: '',
      precio: 0,
    });
  };

  

  useEffect(() => {
    const calculatedTotal = productos.reduce(
      (acc, producto) => acc + producto.unidades * producto.precio,
      0
    );
    setTotal(calculatedTotal);
  }, [productos]);

  const handleSubmit = async (event) => {
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
      total,
    };
  
    try {
      // Hacer la solicitud para agregar la venta
      const response = await fetch('http://localhost:3000/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVenta),
      });
      const data = await response.json();
  
      console.log(data);
  
      // Actualizar el stock para restar las unidades vendidas
      for (const producto of productos) {
        const { modelo, marca, color, talle, unidades } = producto;
        try {
          await deleteStockRequest(marca, modelo, color, talle, unidades);
        } catch (error) {
          console.error('Error al actualizar el stock:', error);
        }
      }
  
      // Limpiar los campos después de una venta exitosa
      setNombreCliente('');
      setTelefonoCliente('');
      setEmailCliente('');
      setProductos([]);
      setTotal(0);
      alert('Venta agregada exitosamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <div className='addVentasMain'>
      <div>
        <label htmlFor="vendedor">Vendedor:</label>
        {userNav === 'juli' ? (
          <input
            type="text"
            id="vendedor"
            value={vendedor}
            onChange={(e) => setVendedor(e.target.value)}
          />
        ) : (
          <input
            style={{ color: "white" }}
            type="text"
            id="vendedor"
            value={userNav}
            disabled
          />
        )}
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
      <label htmlFor="unidades">Unidades:</label>
        <input
          type="number"
          name="unidades"
          value={productoActual.unidades}
          onChange={handleProductChange}
        />
      <label>
        Marca:
        {Array.isArray(marcasApi) ? (
          <select
            name="marca" // Asegúrate de asignar el nombre "marca" al selector
            onChange={handleProductChange}
            required
            value={productoActual.marca ? productoActual.marca._id : ''} // Utiliza el _id de la marca como valor
          >
            <option value="">Seleccione una marca</option>
            {marcasApi.map((marcaObj) => (
              <option key={marcaObj._id} value={marcaObj._id}>
                {marcaObj.marca}
              </option>
            ))}
          </select>
        ) : (
          <p>Cargando marcas...</p>
        )}
      </label>
      <label>
  Modelo:
  <select
    name="modelo"
    onChange={handleProductChange}
    required
    value={productoActual.modelo}
  >
    <option value="">Seleccione un modelo</option>
    {modelosApi.map((modeloObj) => (
      <option key={modeloObj._id} value={modeloObj.modelo}>
        {modeloObj.modelo} - ${modeloObj.precio}
      </option>
    ))}
  </select>
</label>


      <label htmlFor="color">Color:</label>
<select
  name="color"
  value={colorSeleccionado}
  onChange={(e) => setColorSeleccionado(e.target.value)}
>
  <option value="">Seleccione un color</option>
  {[...new Set(coloresApi.map((color) => color.color))].map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ))}
</select>
<label htmlFor="talle">Talle:</label>
<select
  name="talle"
  value={productoActual.talle}
  onChange={handleProductChange}
  required
>
  <option value="">Seleccione un talle</option>
  {coloresApi.map((color) => (
    <option key={color._id} value={color.talle}>
      {color.talle}
    </option>
  ))}
</select>

      </div>

      <button className='agregarVentaProducto' type="button" onClick={handleAddProduct}>
        Agregar Producto
      </button>

      {/* Product List */}
      {productos.map((producto, index) => (
        <div className="productosLista" key={index}>
          <hr />
          <p className='itemLista'>Unidades {producto.unidades}</p>
          <p className='itemLista'>Marca: {producto.marca}</p>
          <p className='itemLista'>Modelo: {producto.modelo}</p>
          <p className='itemLista'>Talle: {producto.talle}</p>
          <p className='itemLista'>Color: {producto.color}</p>
          <p className='itemLista'>Precio: {producto.precio}</p>
          <p className='itemLista'>Precio Total: {producto.precio * producto.unidades}</p> {/* Nuevo campo de Precio Total */}
        </div>
      ))}

      <div>
        <label htmlFor="total">Total ${total}</label>
      </div>
      <button className='agregarVentaProducto' onClick={handleSubmit} type="submit">Agregar venta</button>
    </div>

  );
};

export default VentasForm;
