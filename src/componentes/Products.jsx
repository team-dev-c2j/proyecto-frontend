import React, { useEffect, useState } from "react";

function ProductsComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/products");
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

    // Llamada a la función para obtener los usuarios al cargar el componente
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <div>
              <li key={product.modelo}>{product.modelo}</li>
              <li key={product.marca}>{product.marca}</li>
              <li key={product.talle}>{product.talle}</li>
              <li key={product.color}>{product.color}</li>
              <li key={product.precio}>{product.precio}</li>
              {product.imageUrl && <img src={product.imageUrl} alt="Product Image" />}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsComponent;
