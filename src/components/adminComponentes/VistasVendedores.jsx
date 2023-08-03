import { Link } from 'react-router-dom';
import "../../styles/vistas.css"


const VistasVendedores = () => {
    return (
        <div className="opcionesVistas">
            <div>
                <Link to={`/OrdenCompra`}>
                    <button class="btn btn-outline-info">ver solicitudes</button>
                </Link>
                <Link to={'/ventas'}>
                    <button class="btn btn-outline-info">ver ventas</button>
                </Link >
            </div>

            <div>
                <Link to={`/contactosPanel`}>
                    <button class="btn btn-outline-info">Contactos panel</button>
                </Link>
            </div>
        </div>
    )
}

export default VistasVendedores;