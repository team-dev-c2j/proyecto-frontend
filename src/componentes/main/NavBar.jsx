import '../../styles/NavBar.css';
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';





function Navbar () {
    return (
        <div className='barra1'>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h2 className='name'>KZ</h2>
            </Link>
            <div className='sector2'>
                <Link to="/contacto" style={{ textDecoration: 'none' }}>
                    <h5 className='items'>Contacto</h5>
                </Link>
                <Link to="/contacto" style={{ textDecoration: 'none' }}>
                    <h5 className='items'>Contacto</h5>
                </Link>   
                <Link to="/carrito">
                <button type="button" id='botoninfo' class="btn btn-outline-info">Carro</button>    
                </Link>       
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                    <FaRegUser className='userIcono'/>
                </Link>     
            </div>


        </div>

    )
}

export default Navbar;