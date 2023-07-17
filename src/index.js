import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './componentes/context/CarritoContext';

// Componentes
import Navbar from './componentes/main/NavBar';
import Footer from './componentes/main/Footer';
import BodyCard from './componentes/main/BodyCard';
import Login from './componentes/pages/Login';
import Admin from './componentes/adminComponentes/Admin';
import EditMarcas from './componentes/adminComponentes/marcas/EditcMarcas';
import EditProducto from './componentes/adminComponentes/productos/EditProducto';
import EditUnidad from './componentes/adminComponentes/unidades/EditUnidad';
import ProductoDetail from './componentes/pages/ProductoDetail';
import Carrito from './componentes/context/Carrito';
import FiltroMarcas from './componentes/pages/FiltroMarcas';
import './styles/index.css';

ReactDOM.render(
  <CarritoProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BodyCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/marcas/:id" element={<EditMarcas />} />
        <Route path="/productos/:id" element={<EditProducto />} />
        <Route path="/productoDetail/:id" element={<ProductoDetail />} />
        <Route path="/unidad/:id" element={<EditUnidad />} />
        <Route path='/carrito' element={<Carrito />} />
        <Route path='/:marca' element={<FiltroMarcas />} />
      </Routes>
      <Footer />
    </Router>
  </CarritoProvider>,
  document.getElementById('root')
);