import '../styles/NavBar.css';
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom';





function Navbar () {
    return (
        <div className='barra1'>
            <h2 className='name'>KZ</h2>
            <div className='sector2'>
            <Link>
                <h6 className='items'>New</h6> </Link>
            <Link>
                <h6 className='items'>Mas vendidos</h6>
            </Link>
            <Link to="/admin">
                <h6 className='items'>Admin</h6>
            </Link>            
            <button type="button" id='botoninfo' class="btn btn-outline-info">Carro</button>
            </div>


        </div>

    )
}

export default Navbar;