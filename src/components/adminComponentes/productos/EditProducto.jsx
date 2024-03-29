import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../../styles/admin.css";
import { v4 as uuidv4 } from "uuid";

function EditProducto(props) {
  let { id } = useParams();
  const [productoData, setProductoData] = useState(null);
  const [marca, setMarca] = useState("");
  const [precio, setPrecio] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [descripcion, setDescripcion] = useState("")

  const navigate = useNavigate()

  const fetchMarcasDisponibles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/marcas`);
      const data = await response.json();
      const marcas = data.results.map((marca) => marca.marca);
      setMarcasDisponibles(marcas);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    }
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleFileChange = (index, event) => {
    const files = event.target.files;
    const file = files[0];
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles[index] = file;
      return updatedFiles;
    });
  };

  const handleAddField = () => {
    setSelectedFiles([...selectedFiles, null]);
  };

  const handleDeleteImage = async (index) => {
    try {
      const imageUrlToDelete = imageUrls[index];
      const updatedUrls = [...imageUrls];
      updatedUrls.splice(index, 1);
      setImageUrls(updatedUrls);
      alert(imageUrlToDelete)
    
      const idimg = (imageUrl) => {
        const publicIdRegex = /\/v\d+\/([^.]+)/;
        const match = imageUrl.match(publicIdRegex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
      }

    

      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/deleteImg/${idimg(imageUrlToDelete)}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrlToDelete,
        }),
      });

      alert(imageUrlToDelete + "Imagen eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  useEffect(() => {
    const fetchProductosDisponibles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products`);
        const data = await response.json();
        console.log(data);
        const foundProducto = data.results.find((item) => item._id === id);
        setProductoData(foundProducto);
        setMarca(foundProducto.marca);
        setPrecio(foundProducto.precio);
        setDescripcion(foundProducto.descripcion);
        setImageUrls(foundProducto.imageUrls || []);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchMarcasDisponibles();
    fetchProductosDisponibles();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar este producto?");
  
    if (confirmDelete) {
      try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/${productoData._id}`, {
          method: "DELETE",
        }); 
        alert("Producto eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const formDataArray = selectedFiles.map((file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("archivo", file);
        return formData;
      });

      const uploadPromises = formDataArray.map((formData) => {
        if (!formData) return null;

        return fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/upimage`, {
          method: "POST",
          body: formData,
        }).then((response) => response.json());
      });

      const uploadResults = await Promise.all(uploadPromises);

      const imageUrlArray = uploadResults.map((result) => {
        return result ? result.url : null;
      });

      console.log(imageUrlArray);
      console.log("Archivos subidos exitosamente");

      try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/${productoData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelo: productoData.modelo,
            marca: marca,
            precio: precio,
            descripcion: descripcion,
            imageUrls: [...imageUrls, ...imageUrlArray],
          }),
        });

        alert("Producto actualizado exitosamente");
        navigate("/admin")
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  if (!productoData) {
    return <div>Cargando...</div>;
  }

  return (
      <div className="container mt-5">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleEdit}>
                  <div className="form-group mb-1">
                  <h3>
                      Modelo: {productoData.modelo}
                  </h3>
                  </div>
                  <div className="form-group mb-1">
                    <label>
                      Marca:
                      <select
                        value={marca}
                        onChange={handleMarcaChange}
                        required
                      >
                        <option value="">Seleccione una marca</option>
                        {marcasDisponibles.map((marca, index) => (
                          <option key={index} value={marcasDisponibles.marca}>
                            {productoData.marca}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group mb-1">
                    Precio:
                    <input
                      type="number"
                      name="precio"
                      value={precio}
                      className="form-control"
                      onChange={handlePrecioChange}
                    />
                  </div>
                  <div className="form-group mb-1">
                    Descripcion:
                    <textarea rows="4" cols="50" maxLength="350"
                      type="text"
                      name="precio"
                      value={descripcion}
                      className="form-control"
                      onChange={handleDescripcionChange}
                    />
                  </div>
                  <div className="form-group mb-1">
                    {productoData &&
                      productoData.imageUrls &&
                      productoData.imageUrls.map((url, index) => (
                        <div key={index}>
                          <h6>Imagen {index + 1}</h6>
                          <img
                            src={url}
                            alt={`Selected ${index + 1}`}
                            style={{
                              marginBottom: "15px",
                              width: "100px",
                              height: "auto",
                            }}
                          />
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteImage(index)}
                          >
                            Eliminar Imagen
                          </button>
                        </div>
                      ))}
                  </div>
                  {selectedFiles.length > 0 && (
                      <div>
                        <h6>Nuevas imágenes</h6>
                        {selectedFiles.map((file, index) => (
                          <div key={uuidv4()}>
                            <img
                              src={file ? URL.createObjectURL(file) : ""}
                              alt={`Selected ${index + 1}`}
                              style={{
                                marginBottom: "15px",
                                width: "100px",
                                height: "auto",
                              }}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => handleFileChange(index, event)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddField}
                  >
                    Agregar Imagen
                  </button>
                  <br />
                  <br />
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  <Link to={`/admin`}>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Eliminar Producto
                  </button>
                    </Link>

                </form>
              </div>
            </div>
          </div>
      </div>
  );
}

export default EditProducto;
