import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  const fetchMarcasDisponibles = async () => {
    try {
      const response = await fetch("http://localhost:3000/marcas");
      const data = await response.json();
      const marcas = data.results.map((marca) => marca.marca);
      setMarcasDisponibles(marcas);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    }
  };

  const handleModeloChange = (event) => {
    setProductoData({ ...productoData, modelo: event.target.value });
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
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

      await fetch(`http://localhost:3000/deleteImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrlToDelete,
        }),
      });

      alert("Imagen eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  useEffect(() => {
    const fetchProductosDisponibles = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        console.log(data);
        const foundProducto = data.results.find((item) => item._id === id);
        setProductoData(foundProducto);
        setMarca(foundProducto.marca);
        setPrecio(foundProducto.precio);
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
        await fetch(`http://localhost:3000/products/${productoData._id}`, {
          method: "DELETE",
        });
  
        alert("Producto eliminado exitosamente");
  
        // Realizar otra acción necesaria después de eliminar el producto, como redirigir a otra página
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

        return fetch("http://localhost:3000/upimage", {
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
        await fetch(`http://localhost:3000/products/${productoData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelo: productoData.modelo,
            marca: marca,
            precio: precio,
            imageUrls: [...imageUrls, ...imageUrlArray],
          }),
        });

        alert("Producto actualizado exitosamente");

        // Recargar la página o realizar otra acción necesaria después de la actualización
        window.location.reload();
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
                    <input
                      type="text"
                      name="name"
                      value={productoData.modelo}
                      className="form-control"
                      onChange={handleModeloChange}
                    />
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
                          <option key={index} value={marca}>
                            {marca}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group mb-1">
                    <input
                      type="number"
                      name="precio"
                      value={precio}
                      className="form-control"
                      onChange={handlePrecioChange}
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
