import React from 'react';
import whatsappIcon from '../../styles/images/whatsapp.png'; // Ruta de la imagen de WhatsApp
import '../../styles/iconos.css'

const WhatsAppIcon = () => {
  const linkWhatsap = import.meta.env.VITE_REACT_APP_WHATSAPP
  return (
    <a href={linkWhatsap} target="_blank" rel="noopener noreferrer">
    <img className='whatsapp-icon' src={whatsappIcon} alt="WhatsApp" />
    </a>

  );
};

export default WhatsAppIcon;
