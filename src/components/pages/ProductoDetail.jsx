import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/productoDetail.css";
import { CarritoContext } from "../context/CarritoContext";


const ProductoDetail = (props) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [unidades, setUnidades] = useState(null);
  const [coloresUnicos, setColoresUnicos] = useState([]);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);

  const { agregarProducto } = useContext(CarritoContext); // Mover la llamada a useContext aquí

  const handleUnidadSeleccionada = (talle, color, precio) => {
    setUnidadSeleccionada({ talle, color, precio });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/products/${id}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (producto && producto.modelo) {
      const fetchUnidades = async () => {
        try {
          const response = await fetch(`http://localhost:3000/unidades/modelo/${producto.modelo}`);
          const data2 = await response.json();
          setUnidades(data2);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUnidades();
    }
  }, [producto]);

  useEffect(() => {
    if (unidades) {
      const uniqueColors = [...new Set(unidades.map((unidad) => unidad.color))];
      setColoresUnicos(uniqueColors);
    }
  }, [unidades]);

  const handleColorClick = (color) => {
    setColorSeleccionado(color);
    setUnidadSeleccionada(null); // Restablecer la unidad seleccionada cuando se cambia el color
  };

  const unidadesFiltradas = colorSeleccionado
    ? unidades.filter((unidad) => unidad.color === colorSeleccionado)
    : unidades;

  if (!producto) {
    return <p>Cargando...</p>;
  }

  let toShow; // Declarar toShow fuera del bloque if-else

  if (producto.imageUrls.length === 1) {
    toShow = 1;
  } 

  if (producto.imageUrls.length === 2) {
    toShow = 2;
  } 

  if (producto.imageUrls.length > 2) {
    toShow = 3;
  } 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: toShow,
    slidesToScroll: 1,
  };

  const agregarAlCarrito = () => {
    if (unidadSeleccionada) {
      const productoSeleccionado = {
        id: unidades._id,
        marca: producto.marca,
        modelo: producto.modelo,
        talle: unidadSeleccionada.talle,
        color: unidadSeleccionada.color,
        precio: producto.precio,
        imagen: producto.imageUrls[0],
      };
      agregarProducto(productoSeleccionado);
      alert(`agregaste al carrito ${producto.modelo} talle ${unidadSeleccionada.talle} color ${unidadSeleccionada.talle} precio ${producto.precio}`)
    }
  };
  return (
    <div className="app">
      <div className="sliderCard">
      <Slider {...settings}>
        {producto.imageUrls.map((imageUrl, index) => (
          <div className="cardDetail" key={index}>
            <div className="card-top">
              <img className="imagenCarrusel" src={imageUrl} alt={`Imagen ${index + 1}`} />
            </div>
          </div>
        ))}
      </Slider>
      </div>

      <div className="before-after"></div>
      <div className="detalles">
        <h3>{producto.modelo} ${producto.precio}</h3>
        <div>
          <p>Seleccionar color</p>
          {coloresUnicos.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(color)}
              className={color === colorSeleccionado ? "selected" : "noSelected"}
            >
              {color}
            </button>
          ))}
        </div>
        {colorSeleccionado && (
          <div className="buttonTalleColorContainer">
            <p>Unidades con color {colorSeleccionado}:</p>
            <h6>Talle:</h6>
            <div className="talleCard">
            {unidadesFiltradas.map((unidad, index) => (
              <div id="buttonTalleColor" key={index}>
                <button
                  onClick={() => handleUnidadSeleccionada(unidad.talle, unidad.color)}
                  className={
                    unidad.talle === unidadSeleccionada?.talle &&
                    unidad.color === unidadSeleccionada?.color
                      ? "selected"
                      : "noSelected"
                  }
                >
                  {unidad.talle}
                </button>
              </div>
            ))}
            </div>

          </div>
        )}
        {unidadSeleccionada && (
          <div>
            <h5>Cantidad</h5>
            <div className="cantidad">
            <p>-</p>1<p>+</p>
            </div>
            
            <h5>{producto.modelo} Talle {unidadSeleccionada.talle} color {unidadSeleccionada.color}</h5>
            <button className="noSelected" onClick={agregarAlCarrito}>agregar al carrito</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductoDetail;
