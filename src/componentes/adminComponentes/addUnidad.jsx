import React, { useState, useEffect } from 'react';

function AddUnidad() {
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [talle, setTalle] = useState('');
  const [stock, setStock] = useState('');
  const [modelosDisponibles, setModelosDisponibles] = useState([]);

  useEffect(() => {
    fetchModelosDisponibles()
      .then((modelos) => {
        setModelosDisponibles(modelos);
      })
      .catch((error) => {
        console.error('Error al obtener los modelos:', error);
      });
  }, []);

  const fetchModelosDisponibles = () => {
    return fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => data.results.map((product) => product.modelo));
  };

  const handleModelChange = (event) => {
    setModelo(event.target.value);
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

    if (modelo && color && talle && stock) {
      try {
        await fetch('http://localhost:3000/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            modelo: modelo,
            color: color,
            talle: talle,
            stock: stock,
          }),
        });

        alert('Producto agregado exitosamente');

        setModelo('');
        setColor('');
        setTalle('');
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo:
          <select value={modelo} onChange={handleModelChange}>
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
          <input type="text" value={color} onChange={handleColorChange} />
        </label>
        <br />
        <label>
          Talle:
          <input type="text" value={talle} onChange={handleTalleChange} />
        </label>
        <br />
        <label>
          Stock:
          <input type="text" value={stock} onChange={handleStockChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUnidad;
