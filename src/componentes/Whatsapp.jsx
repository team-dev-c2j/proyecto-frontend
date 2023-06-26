import React from 'react';
import whatsappIcon from '../styles/images/whatsapp.png'; // Ruta de la imagen de WhatsApp
import '../styles/iconos.css'

const WhatsAppIcon = () => {
  return (
    <img className='whatsapp-icon' src={whatsappIcon} alt="WhatsApp" />
  );
};

export default WhatsAppIcon;
