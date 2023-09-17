import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([null, null]);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [loading, setLoading] = useState(false); 
  
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
    return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/marcas`)
      .then((response) => response.json())
      .then((data) => data.results.map((marca) => marca.marca));
  };

  const handleModelChange = (event) => {
    setModelo(event.target.value);
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
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
      if (modelo && marca && precio) {
        setLoading(true);
        const formDataArray = selectedFiles.map((file) => {
          if (!file) return null;

          const formData = new FormData();
          formData.append('archivo', file);
          return formData;
        });

        const uploadPromises = formDataArray.map((formData) => {
          if (!formData) return null;

          return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/upimage`, {
            method: 'POST',
            body: formData,
          }).then((response) => response.json());
        });

        const uploadResults = await Promise.all(uploadPromises);

        const imageUrlArray = uploadResults.map((result) => {
          return result ? result.url : null;
        });

        console.log(imageUrlArray);
        console.log('Archivos subidos exitosamente');

        try {
          await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              modelo: modelo,
              marca: marca,
              descripcion: descripcion,
              precio: precio,
              imageUrls: imageUrlArray,
            }),
          });

          alert('Producto agregado exitosamente');

          
        } catch (error) {
          console.error('Error al agregar el producto:', error);
        } finally {
          setLoading(false); 
        }
      }
    } catch (error) {
      console.error('Error al subir los archivos:', error);
    }
  };

  return (
    <div className="addAdmin">
      <h6>Añadir producto</h6>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo:
          <input type="text" value={modelo} onChange={handleModelChange} />
        </label>
        <br />
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
        <br />
        <label>
          Descripcion:
          <textarea value={descripcion} onChange={handleDescripcionChange} rows="4" cols="50" maxLength="350" />
        </label>
        <br />
        <label>
          Precio:
          <input type="number" value={precio} onChange={handlePrecioChange} />
        </label>
        <br />
        {selectedFiles.map((file, index) => (
          <div key={index}>
            <label>
              Imagen {index + 1}:
              <input className="selectedImage" type="file" onChange={(event) => handleFileChange(event, index)} required />
            </label>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt={`Imagen ${index + 1}`}
                className="selected-image"
              />
            )}
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
        {loading ? ( // Mostrar el spinner cuando loading es true
          <div className="loading-spinner"></div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
