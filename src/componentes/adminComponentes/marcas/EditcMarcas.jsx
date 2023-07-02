import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../../styles/admin.css';

function EditMarcas(props) {
  let { id } = useParams();
  const [marcaData, setMarcaData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    const fetchMarcasDisponibles = async () => {
      try {
        const response = await fetch('http://localhost:3000/marcas');
        console.log(response)
        console.log(id)
        const data = await response.json();
        console.log(data)
        const foundMarca = data.results.find((item) => item._id === id);
        setMarcaData(foundMarca);
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };
  
    fetchMarcasDisponibles();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      let imageUrlToUpdate = marcaData.imageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('archivo', selectedFile);

        const response = await fetch('http://localhost:3000/upimage', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        imageUrlToUpdate = data.url;

        console.log('Archivo subido exitosamente:', imageUrlToUpdate);
      }

      try {
        await fetch(`http://localhost:3000/marcas/${marcaData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            marca: marcaData.marca,
            imageUrl: imageUrlToUpdate,
          }),
        });

        alert('Marca actualizada exitosamente');

        // Restablecer los campos del formulario
        window.location.reload();
      } catch (error) {
        console.error('Error al actualizar la marca:', error);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleMarcaChange = (event) => {
    setMarcaData({ ...marcaData, marca: event.target.value });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta marca?");
  
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/marcas/${marcaData._id}`, {
          method: 'DELETE',
        });
  
        alert('Marca eliminada exitosamente');
  
        // Redireccionar a la página de marcas u otra acción necesaria
      } catch (error) {
        console.error('Error al eliminar la marca:', error);
      }
    }
  };

  if (!marcaData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="brand-container">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleEdit}>
                  <div className="form-group mb-1">
                    <input
                      type="text"
                      name="name"
                      value={marcaData.marca}
                      className="form-control"
                      onChange={handleMarcaChange}
                    />
                  </div>
                  <div className="form-group mb-1">
                    <input type="file" onChange={handleFileChange} />
                    {imageUrl && (
                      <div>
                        <h6>Nueva imagen</h6>
                        <img
                          src={imageUrl}
                          alt="Selected"
                          style={{
                            marginBottom: '15px',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                          }}
                        />
                        <br />
                      </div>
                    )}
                  </div>
                  <h6>Imagen actual</h6>
                  <img
                    src={marcaData.imageUrl}
                    className="brand-image"
                    alt="Brand"
                  />
                  <br />
                  <button type="submit" className="btn btn-primary">
                    EDITAR
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    ELIMINAR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMarcas;
