import React, { useState } from 'react';

function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleModelChange = (event) => {
    setModelo(event.target.value);
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleFileChange = (event, index) => {
    const files = Array.from(event.target.files);
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = files[0];
    setSelectedFiles(updatedFiles);
  };

  const handleAddField = () => {
    setSelectedFiles([...selectedFiles, null]);
  };

  const handleRemoveField = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const urls = await Promise.all(
        selectedFiles.map(async (file) => {
          if (!file) return null;

          const formData = new FormData();
          formData.append('archivo', file);

          const response = await fetch('http://localhost:3000/upimage', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          return data.url;
        })
      );

      setImageUrls(urls);
      console.log(urls);
      console.log('Archivos subidos exitosamente');

      if (modelo && marca && precio) {
        try {
          await fetch('http://localhost:3000/addProduct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              modelo: modelo,
              marca: marca,
              precio: precio,
              imageUrls: urls,
            }),
          });

          alert('Producto agregado exitosamente');

          // Limpiar los campos después de enviar el formulario
          setSelectedFiles([]);
          setModelo('');
          setMarca('');
          setPrecio('');
        } catch (error) {
          console.error('Error al agregar el producto:', error);
        }
      }
    } catch (error) {
      console.error('Error al subir los archivos:', error);
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
        <br />
        <label>
          Precio:
          <input type="text" value={precio} onChange={handlePrecioChange} />
        </label>
        <br />
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <label>
              Imagen {index + 1}:
              <input type="file" onChange={(event) => handleFileChange(event, index)} />
            </label>
            <button type="button" onClick={() => handleRemoveField(index)}>
              -
            </button>
          </div>
        ))}
        <br />
        <button type="button" onClick={handleAddField}>
          +
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
