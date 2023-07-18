import { Link } from 'react-router-dom';
import "../../styles/vistas.css"


const Vistas = () => {
    return (
        <div className="opcionesVistas">
            <Link to={`/OrdenCompra`}>
                <button class="btn btn-outline-info">ver solicitudes</button>
            </Link>
            <button class="btn btn-outline-info">ver ventas</button>
            <button class="btn btn-outline-info">agregar vendedores</button>
        </div>
    )
}

export default Vistas;