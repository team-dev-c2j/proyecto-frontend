import React, { useEffect, useState } from 'react';
import '../../styles/marcas.css'
import { Link } from 'react-router-dom';

function Marcas() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/marcas`);
      const data = await response.json();
      setBrands(data.results);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  return (
    <div className="brand-container">
      {brands.map((brand) => (
        <Link to={`/${brand.marca}`} style={{ textDecoration: 'none' }} key={brand._id}>
            <div key={brand._id} className="brand-item">
              <img src={brand.imageUrl} alt={brand.marca} className="brand-image" />
              <p className="brand-name">{brand.marca}</p>
            </div>
        </Link>

      ))}
    </div>
  );
}

export default Marcas;
