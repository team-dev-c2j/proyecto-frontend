import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../../styles/Products.css';
import Loader from "../utils/Loader";



function ProductsComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products`);
        const data = await response.json();
        if (response.ok) {
          setProducts(data.results);
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
  }, []);

  return (
    <div className="main-cointainer">
      {products.length === 0 ? (
        <Loader></Loader>
      ) : (
        <div className="main">
          {products.map((product) => (
            <div  className="card-container" key={product.modelo}>
              <Link to={`/productoDetail/${product._id}`} style={{ textDecoration: 'none' }}>
              <div className="divCard">
                <div>
                <article>
                  {product.imageUrls && product.imageUrls.length > 0 && (
                    <>
                      <img src={product.imageUrls[0]} alt="Product Image1" />
                      {product.imageUrls.length > 1 ? (
                        <img src={product.imageUrls[1]} alt="Product Image2" />
                      ) : (
                        <img src={product.imageUrls[1]} alt="Product Image2" className="alternative-image" style={{ display: 'none' }} />
                      )}
                    </>
                  )}
                </article>

                  <div className="productDetail">
                      <div>
                      {product.modelo}  {product.marca}  
                      </div>
                    ${product.precio}
                  </div>

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

export default ProductsComponent;
