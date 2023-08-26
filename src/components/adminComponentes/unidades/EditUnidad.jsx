import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../styles/admin.css";

function EditUnidad () {
    const [modeloUnidad, setModeloUnidad] = useState("");
    const [color, setColor] = useState("");
    const [talle, setTalle] = useState("");
    const [stock, setStock] = useState("");
    let { id } = useParams();

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };
    const handleTalleChange = (event) => {
        setTalle(event.target.value);
    };
    
    const handleStockChange = (event) => {
        setStock(event.target.value);
    };

    useEffect(() => {
        const fetchUnidades = async () => {
          try {
            const response = await fetch("http://localhost:3000/unidades");
            const data = await response.json();
            console.log(data);
            const foundUnidad = data.results.find((item) => item._id === id);
            setModeloUnidad(foundUnidad);
            setColor(foundUnidad.color);
            setTalle(foundUnidad.talle);
            setStock(foundUnidad.stock);
          } catch (error) {
            console.error("Error al obtener las unidades:", error);
          }
        };
    
        fetchUnidades();
      }, [id]);

    const handleEdit = async (event) => {
        event.preventDefault();
    
    
        try {
            await fetch(`http://localhost:3000/unidades/edit/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                modeloUnidad: modeloUnidad.modeloUnidad,
                color: color,
                talle: talle,
                stock: stock,
              }),
            });
    
            alert("Unidades actualizadas exitosamente");
  
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
      };

      const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro que quieres eliminar estas Unidades?");
      
        if (confirmDelete) {
          try {
            await fetch(`http://localhost:3000/unidades/${id}`, {
              method: "DELETE",
            });      
            alert("Unidades eliminadas exitosamente");      
          } catch (error) {
            console.error("Error al eliminar las unidades:", error);
          }
        }
      };

      return (
        <div className="container mt-5">
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleEdit}>
                    <div className="form-group mb-1">
                    <h3>
                        Unidades de: {modeloUnidad.modeloUnidad}
                    </h3>
                    </div>
                    <div className="form-group mb-1">
                    <h6>Color</h6>
                      <input
                        type="text"
                        name="Color"
                        value={color}
                        className="form-control"
                        onChange={handleColorChange}
                      />
                    </div>
                    <div className="form-group mb-1" >
                    <h6>Talle</h6>
                      <input 
                        type="number"
                        name="precio"
                        value={talle}
                        className="form-control"
                        onChange={handleTalleChange}
                      />
                    </div>
                    <div className="form-group mb-1">
                        <h6>Stock</h6>
                      <input
                        type="number"
                        name="Stock"
                        value={stock}
                        className="form-control"
                        onChange={handleStockChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
                    <Link to={`/admin`}>
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                    >
                      Eliminar Unidades
                    </button>
                      </Link>
  
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
}

export default EditUnidad