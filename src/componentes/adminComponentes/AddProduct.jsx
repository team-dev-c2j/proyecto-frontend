import React, { useState } from 'react';

function AddProduct () {
    const [selectedFile, setSelectedFile] = useState(null);
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [color, setColor] = useState('');
    const [talle, setTalle] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [imageUrl, setImageUrl] = useState('');
  
    const handleModelChange = (event) => {
      setModelo(event.target.value);
    };

    const handleMarcaChange = (event) => {
      setMarca(event.target.value);
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

    const handlePrecioChange = (event) => {
      setPrecio(event.target.value);
    };
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('archivo', selectedFile);
  
          const response = await fetch('http://localhost:3000/upimage', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          setImageUrl(data.url)
          console.log(data.url);
          console.log('Archivo subido exitosamente');
        } catch (error) {
          console.error('Error al subir el archivo:', error);
        }
      }
  
      if (modelo && marca && color && talle && stock && precio) {
        try {
          await fetch('http://localhost:3000/addProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ modelo: modelo, marca: marca, color: color, talle: talle , stock: stock, precio: precio, imageUrl: imageUrl})
          });
  
          alert('Producto agregado exitosamente');
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
            <input type="text" value={modelo} onChange={handleModelChange} />
          </label>
          <br />
          <label>
            Marca:
            <input type="text" value={marca} onChange={handleMarcaChange} />
          </label>
          <label>
            Color:
            <input type="text" value={color} onChange={handleColorChange} />
          </label>
          <br />
          <label>
            talle:
            <input type="text" value={talle} onChange={handleTalleChange} />
          </label>
          <label>
            Stock:
            <input type="text" value={stock} onChange={handleStockChange} />
          </label>
          <label>
            Precio:
            <input type="text" value={precio} onChange={handlePrecioChange} />
          </label>
          <br />
          <br />
          <input type="file" onChange={handleFileChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default AddProduct;