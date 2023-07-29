import '../../styles/NavBar.css';
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';





function Navbar () {

    const { userNav } = useAuth()

    return (
        <div className='barra1'>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h2 className='name'>KZ</h2>
            </Link>
            <div className='sector2'>
                <Link to="/contacto" style={{ textDecoration: 'none' }}>
                    <h5 className='items'>Contacto</h5>
                </Link>   
                <Link to="/carrito">
                <button type="button" id='botoninfo' class="btn btn-outline-info">Carro</button>    
                </Link>       
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <FaRegUser className='userIcono'/>

                </Link>    
                <h8 className="userNav">{userNav}</h8> 
            </div>


        </div>

    )
}

export default Navbar;