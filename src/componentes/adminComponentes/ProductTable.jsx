import React, { useEffect, useState } from 'react';
import '../../styles/table.css';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [matchingUnits, setMatchingUnits] = useState([]);
  const [loadingMatchingUnits, setLoadingMatchingUnits] = useState(false); // Estado de carga de las unidades coincidentes

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data.results);
          console.log('ok');
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleDetails = async (productId) => {
    setExpandedProduct((prevExpandedProduct) => {
      if (prevExpandedProduct === productId) {
        return null;
      } else {
        return productId;
      }
    });

    try {
      setLoadingMatchingUnits(true); // Activar el estado de carga
      const response = await fetch('http://localhost:3000/unidades');
      const data = await response.json();
      if (response.ok) {
        const matchingUnits = data.results.filter((unit) => unit.modeloUnidad === productId);
        setMatchingUnits(matchingUnits);
        console.log('ok');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error fetching matching units:', error);
    } finally {
      setLoadingMatchingUnits(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="addAdmin">
      <div className="table">
        <h2>Productos</h2>
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <table>
            <tbody>
              {products.map((product) => (
                <React.Fragment key={product.modelo}>
                  <tr>
                    <td>
                      <button onClick={() => toggleDetails(product.modelo)}>
                        {product.modelo} {product.marca}
                      </button>
                      <button className='editBoton'> Edit</button>
                    </td>
                  </tr>
                  {expandedProduct === product.modelo && (
                    <tr>
                      <td colSpan="2">
                        {loadingMatchingUnits ? (
                          <p>Loading matching units...</p> // Mostrar mensaje de carga
                        ) : (
                          <table>
                            <thead>
                              <tr>
                                <th>Color</th>
                                <th>Talle</th>
                                <th>Stock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {matchingUnits.map((unit) => (
                                <tr key={unit._id}>
                                  <td>{unit.color}</td>
                                  <td>{unit.talle}</td>
                                  <td>{unit.stock}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductTable;
