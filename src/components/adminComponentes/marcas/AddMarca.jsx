import React, { useState, useRef } from 'react';
import '../../../styles/admin.css';

function AddProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [marca, setMarca] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const formRef = useRef(null);

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Mostrar la imagen temporalmente
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!selectedFile || !marca) {
        console.log('Debe seleccionar una imagen y proporcionar una marca');
        return;
      }

      const formData = new FormData();
      formData.append('archivo', selectedFile);

      const response = await fetch('http://localhost:3000/upimage', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.url;

      setImageUrl(imageUrl);
      console.log('Archivo subido exitosamente:', imageUrl);

      try {
        await fetch('http://localhost:3000/Marcas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca: marca,
            imageUrl: imageUrl,
          }),
        });

        alert('Marca agregada exitosamente');
      } catch (error) {
        console.error('Error al agregar la marca:', error);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  return (
    <div className='addAdmin'>
      <h6>Añadir marca</h6>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          Marca:
          <input type="text" value={marca} onChange={handleMarcaChange} required />
        </label>
        <br />
        <label>
          Imagen: 
          <input className="selectedImage" type="file" onChange={handleFileChange} required />
        </label>
        <br />
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Selected" style={{marginBottom: '15px', marginLeft: '120px', width: '100px', height: '100px', borderRadius: '50%' }} />
            <br />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
