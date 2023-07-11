import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/productoDetail.css";

const ProductoDetail = (props) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [unidades, setUnidades] = useState(null);
  const [coloresUnicos, setColoresUnicos] = useState([]);
  const [tallesUnicos, setTallesUnicos] = useState([]);

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
      const uniqueSizes = [...new Set(unidades.map((unidad) => unidad.talle))];
      setColoresUnicos(uniqueColors);
      setTallesUnicos(uniqueSizes);
    }
  }, [unidades]);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="app">
      <Slider {...settings}>
        {producto.imageUrls.map((imageUrl, index) => (
          <div className="card" key={index}>
            <div className="card-top">
              <img className="imagenCarrusel" src={imageUrl} alt={`Imagen ${index + 1}`} />
            </div>
          </div>
        ))}
      </Slider>
      <div className="before-after"></div>
      <div className="detalles">
        <h3>{producto.modelo}</h3>
        <h3>${producto.precio}</h3>
        <p>Unidades:</p>
        <div>
          <p>Colores:</p>
          {coloresUnicos.map((color, index) => (
            <p key={index}>{color}</p>
          ))}
        </div>
        <div>
          <p>Talles:</p>
          {tallesUnicos.map((talle, index) => (
            <p key={index}>{talle}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductoDetail;
