import React, { useState, useEffect } from 'react';

function AddUnidad() {
  const [marca, setMarca] = useState('');
  const [modeloUnidad, setModeloUnidad] = useState('');
  const [color, setColor] = useState('');
  const [talle, setTalle] = useState('');
  const [stock, setStock] = useState('');
  const [modelosDisponibles, setModelosDisponibles] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);

  useEffect(() => {
    fetchMarcasDisponibles()
      .then((marcas) => {
        setMarcasDisponibles(marcas);
      })
      .catch((error) => {
        console.error('Error al obtener las marcas:', error);
      });
  }, []);

  const fetchMarcasDisponibles = () => {
    return fetch(`${process.env.REACT_APP_URL}/marcas`)
      .then((response) => response.json())
      .then((data) => data.results.map((marca) => marca.marca));
  };

  useEffect(() => {
    if (marca) { // Verifica si marca no está vacío antes de hacer la solicitud fetch
      fetchModelosDisponibles(marca)
        .then((modelos) => {
          setModelosDisponibles(modelos);
        })
        .catch((error) => {
          console.error('Error al obtener los modelos:', error);
        });
    }
  }, [marca]);
  

  const fetchModelosDisponibles = (marca) => {
    return fetch(`${process.env.REACT_APP_URL}/products/marca/${marca}`)
      .then((response) => response.json())
      .then((data) => data.map((product) => product.modelo));
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handleModelUnidadChange = (event) => {
    setModeloUnidad(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleTalleChange = (event) => {
    setTalle(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (marca && modeloUnidad && color && talle && stock) {
      try {
        await fetch(`${process.env.REACT_APP_URL}/unidades`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca: marca,
            modeloUnidad: modeloUnidad,
            color: color,
            talle: talle,
            stock: stock,
          }),
        });

        alert('Producto agregado exitosamente');
        setMarca('')
        setModeloUnidad('');
        setColor('');
        setTalle('');
        setStock('');
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }
  };

  return (
    <div className='addAdmin'>
        <h6>añadir unidad</h6>
      <form onSubmit={handleSubmit}>
      <label>
          Marca:
          <select value={marca} onChange={handleMarcaChange} required>
            <option value="">Seleccione una marca</option>
            {marcasDisponibles.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </label>
          <label>
            Modelo:
             <select value={modeloUnidad} onChange={handleModelUnidadChange} required>
               <option value="">Seleccione un modelo</option>
                 {modelosDisponibles.map((modelo, index) => (
                <option key={index} value={modelo}>
                  {modelo}
                  </option>
                    ))}
              </select>
          </label>
        <br />
        <label>
          Color:
          <input type="text" value={color} onChange={handleColorChange} required/>
        </label>
        <br />
        <label>
          Talle:
          <input type="text" value={talle} onChange={handleTalleChange} required/>
        </label>
        <br />
        <label>
          Stock:
          <input type="text" value={stock} onChange={handleStockChange} required/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUnidad;
