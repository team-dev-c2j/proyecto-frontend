import '../../styles/NavBar.css';
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Carrito from '../context/Carrito'
import { useState } from 'react';
import { FaCartPlus  } from "react-icons/fa";
import { logoutRequest } from '../api/auth';
import { useNavigate } from "react-router-dom";

function Navbar () {

    const navigate = useNavigate()
    const { setUserNav, setIsAuthenticated } = useAuth()
    const logout = () => {
        logoutRequest()
        setUserNav('')
        setIsAuthenticated(false)
        navigate('/login')
    }

    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const toggleCarrito = () => {
        console.log("Antes del cambio:", mostrarCarrito);
        setMostrarCarrito(!mostrarCarrito);
        console.log("Después del cambio:", mostrarCarrito);
      };

    const { userNav } = useAuth()

    return (
        <div>
        <div className='barra1'>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h2 className='name'>{process.env.REACT_APP_NAME_NAV}</h2>
            </Link>
            <div className='sector2'>
                <Link to="/contacto" style={{ textDecoration: 'none' }}>
                    <h5 className='items'>Contacto</h5>
                </Link>    
                <div className='carritoIconNav'>
                <FaCartPlus size="20px" color="#1ee2e7" onClick={toggleCarrito} />
                </div>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <FaRegUser className='userIcono'/>

                </Link>  
                <p className="userNav">{userNav}</p> 
            </div>
            
        </div>
        <div className="logout">
        {userNav && (
                
                <p className="logoutChild" onClick={() => logout()}>Cerrar sesión</p>
                )}  
        </div>
        <div className='pp'>
            <div className={`carritoForm ${mostrarCarrito ? "mostrar" : ""}`}>
                <Carrito cerrarCarrito={toggleCarrito} />
            </div>
        </div>


        </div>




    )
}

export default Navbar;