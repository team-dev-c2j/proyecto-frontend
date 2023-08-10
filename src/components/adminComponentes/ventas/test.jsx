import React, { useState, useEffect } from 'react';
import "../../../styles/addVentas.css"
import { useAuth } from '../../context/AuthContext';
import { getMarcasRequest } from '../../api/marcas';
import { getModelosRequest } from '../../api/modelos';
import { getColoresRequest } from '../../api/unidades';

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


  const handleProductChange = async (e) => {
    const { name, value } = e.target;
  
    if (name === "marca") {
      const selectedMarca = marcasApi.find((marcaObj) => marcaObj._id === value);
      if (selectedMarca) {
        setProductoActual((prevProduct) => ({
          ...prevProduct,
          marca: selectedMarca,
        }));
        console.log(selectedMarca.marca);
        try {
          // Obtener los modelos disponibles para la marca seleccionada
          const modelos = await getModelosRequest(selectedMarca.marca);
          console.log(modelos);
          if (Array.isArray(modelos)) {
            setModelosApi(modelos);
          } else {
            console.error('La respuesta de la API de modelos no es un array:', modelos);
          }
        } catch (error) {
          console.error('Error al obtener los modelos:', error);
        }
  
        // Reiniciar los colores disponibles y el color seleccionado cuando cambia la marca
        setColoresApi([]);
        setColorSeleccionado('');
      } else {
        setProductoActual((prevProduct) => ({
          ...prevProduct,
          marca: '', // Establecemos la marca en una cadena vacía si no se encuentra en el array
        }));
      }
    } else if (name === "modelo") {
      // Obtener los colores disponibles para la marca y el modelo seleccionados
      const colores = await getColoresRequest(productoActual.marca._id, value);
      setColoresApi(colores);
      setColorSeleccionado(''); // Reiniciar el color seleccionado al cambiar el modelo
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: value }));
    } else if (name === "precio") {
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: parseFloat(value) }));
    } else {
      setProductoActual((prevProduct) => ({ ...prevProduct, [name]: value }));
    }
  };
  
  
  
  
const handleAddProduct = () => {
  // Guardar solo el nombre de la marca en productoActual antes de agregarlo a productos
  setProductoActual((prevProduct) => ({
    ...prevProduct,
    marca: prevProduct.marca.marca,
  }));

  // Crear una copia de productoActual, extrayendo solo el nombre de la marca, y agregarla a la lista de productos
  setProductos((prevProducts) => [
    ...prevProducts,
    { ...productoActual, marca: productoActual.marca.marca },
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
         setNombreCliente('');
         setTelefonoCliente('');
         setEmailCliente('');
         setProductos([]);
         setTotal(0);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      alert('Venta agregada exitosamente');
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
              {modeloObj.modelo}
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
  {coloresApi.map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ))}
</select>
                <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          name="precio"
          value={productoActual.precio * productoActual.unidades}
          onChange={handleProductChange}
        />
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
