import React from 'react';
import '../../styles/footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  const telefono = import.meta.env.VITE_REACT_APP_TELEFONO
  const direcion = import.meta.env.VITE_REACT_APP_DIRECION
  const facebook= import.meta.env.VITE_REACT_APP_FACEBOOK
  const instagram = import.meta.env.VITE_REACT_APP_INSTAGRAM
  const tiktok = import.meta.env.VITE_REACT_APP_TIKTOK
  return (
    <div className="footer">
        <div className='contacto'>
            <h5>contacto:</h5>
            <h6>{telefono}</h6>
            <h6>{direcion}</h6>
            <h6>local F2 45555</h6>
        </div>

          <div className="react-icons">
          <a href={facebook} target="_blank" rel="noopener noreferrer" className='react-icons'>
          <FaFacebook className='icono' />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className='react-icons'>
          <FaInstagram className='icono' />
          </a>
          <a href={tiktok} target="_blank" rel="noopener noreferrer" className='react-icons'>
          <FaTiktok className='icono' />
          </a>
          </div>
    </div>
  );
}

export default Footer;
