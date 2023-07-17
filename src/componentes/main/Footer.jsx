import React from 'react';
import '../../styles/footer.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer">
        <div className='contacto'>
            <h5>contacto:</h5>
            <h6>3544334354535</h6>
            <h6>direcion 12155</h6>
            <h6>local saddd 45555</h6>
        </div>

          <div className="react-icons">
            <FaFacebook className='icono' />
            <FaInstagram className='icono' />
            <FaTiktok className='icono' />
          </div>
    </div>
  );
}

export default Footer;
