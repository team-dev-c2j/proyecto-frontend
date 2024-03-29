import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../../styles/Products.css';
import Loader from "../utils/Loader";

const FiltroMarcas = () => {

    const { marca } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Función para obtener los productos
        const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products/marca/${marca}`);
            const data = await response.json();
        if (response.ok) {
          setProducts(data);
          console.log("ok");
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Llamada a la función para obtener los productos al cargar el componente
    fetchProducts();
  }, [marca]);

  return (
    <div class="main-cointainer">
      {products.length === 0 ? (
        <Loader></Loader>
      ) : (
        <div class="main" style={{marginTop: '35px'}}>
          {products.map((product) => (
            <div  class="card-container" key={product.modelo}>
              <Link to={`/productoDetail/${product._id}`} style={{ textDecoration: 'none' }}>
              <div className="divCard">
                <div>
                  <article>
                    {product.imageUrls && (
                      <>
                        <img src={product.imageUrls[0]} alt="Product Image1" />
                        <img src={product.imageUrls[1]} alt="Product Image2" />
                      </>
                    )}
                  </article>
                    {product.modelo}<br/>
                    {product.marca}<br/>
                    ${product.precio}
                </div>
              </div>  
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FiltroMarcas;
