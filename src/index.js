import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/NavBar';
import Footer from './componentes/Footer';
import Login from './componentes/Login';
import Admin from './componentes/adminComponentes/Admin';
import BodyCard from './componentes/BodyCard';
import './styles/index.css';
import EditMarcas from './componentes/adminComponentes/marcas/EditcMarcas';
import EditProducto from './componentes/adminComponentes/productos/EditProducto'
import EditUnidad from './componentes/adminComponentes/unidades/EditUnidad'
import ProductoDetail from './componentes/ProductoDetail';
import { CarritoProvider } from './componentes/context/CarritoContext';
import Carrito from './componentes/context/Carrito';
import FiltroMarcas from './componentes/FiltroMarcas';

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