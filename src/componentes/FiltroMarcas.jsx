import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/Products.css';

const FiltroMarcas = () => {

    const { marca } = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Función para obtener los productos
        const fetchProducts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/products/marca/${marca}`);
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
        <p>Loading products...</p>
      ) : (
        <div class="main">
          {products.map((product) => (
            <div  class="card-container" key={product.modelo}>
              <Link to={`/productoDetail/${product._id}`}>
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
