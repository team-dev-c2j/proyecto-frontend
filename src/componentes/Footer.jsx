import React from 'react';
import '../styles/footer.css';
import instaIcono from '../styles/images/instaIcono.png';
import faceIcono from '../styles/images/faceIcono.png';

function Footer() {
  return (
    <div className="footer">
        <div className='contacto'>
            <h5>contacto:</h5>
            <h6>3544334354535</h6>
            <h6>direcion 12155</h6>
            <h6>local saddd 45555</h6>
        </div>
        <div className="iconosFooter">
            <img className="instaIcono" src={instaIcono} alt="instaIcono" />
            <img className="facebookIcono" src={faceIcono} alt="faceIcono" />
        </div>
    </div>
  );
}

export default Footer;
