import { Link } from 'react-router-dom';
import "../../styles/vistas.css"


const Vistas = () => {
    return (
        <div className="opcionesVistas">
            <div>
                <Link to={`/OrdenCompra`}>
                    <button className="btn btn-outline-info">ver solicitudes</button>
                </Link>
                <Link to={'/ventas'}>
                    <button className="btn btn-outline-info">ver ventas</button>
                </Link >
                <Link to={'/register'}>
                   <button className="btn btn-outline-info">agregar vendedores</button><br/>
                </Link>
            </div>

            <div>
                <Link to={`/marcasPanel`}>
                    <button className="btn btn-outline-info">Marcas panel</button>
                </Link>
                <Link to={`/productosPanel`}>
                    <button className="btn btn-outline-info">Productos panel</button>
                </Link>
                <Link to={`/contactosPanel`}>
                    <button className="btn btn-outline-info">Contactos panel</button>
                </Link>
            </div>
        </div>
    )
}

export default Vistas;