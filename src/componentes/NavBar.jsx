import '../styles/NavBar.css';
import "bootstrap/dist/css/bootstrap.css"




function Navbar () {
    return (
        <div className='barra1'>
            <h2 className='name'>KZ</h2>
            <div className='sector2'>
            <h6 className='items'>new</h6>
            <h6 className='items'>mas vendidos</h6>
            <h6 className='items'>Admin</h6>
            <button type="button" id='botoninfo' class="btn btn-outline-info">Carro</button>
            </div>

        </div>

    )
}

export default Navbar;