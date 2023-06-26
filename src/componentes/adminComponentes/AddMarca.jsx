import React, { useState, useRef } from 'react';
import '../../styles/admin.css'

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
        await fetch('http://localhost:3000/addMarca', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca: marca,
            imageUrl: imageUrl,
          }),
        });

        alert('Marca agregado exitosamente');

        // Restablecer los campos del formulario
        formRef.current.reset();
        setSelectedFile(null);
        setMarca('');

        // Actualizar la página
        window.location.reload();
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  return (
    <div className='addAdmin'>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          Marca:
          <input type="text" value={marca} onChange={handleMarcaChange} />
        </label>
        <br />
        <label>
          Imagen:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
