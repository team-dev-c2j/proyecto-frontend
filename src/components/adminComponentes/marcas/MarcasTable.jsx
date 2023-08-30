import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/marcas.css'

function MarcasTable() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/marcas`);
      const data = await response.json();
      setBrands(data.results);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  return (
    <div className="brand-container">
      {brands.map((brand) => (
        <div key={brand._id} className="brand-item">
          <img src={brand.imageUrl} alt={brand.marca} className="brand-image" />
          <p className="brand-name">{brand.marca}</p>
          <Link to={`/marcas/${brand._id}`}><button className='editBoton'>Edit</button></Link>
          
        </div>
      ))}
    </div>
  );
}

export default MarcasTable;
