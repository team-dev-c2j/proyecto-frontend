import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './components/context/CarritoContext';

// Componentes
import Navbar from './components/main/NavBar';
import Footer from './components/main/Footer';
import BodyCard from './components/main/BodyCard';
import Login from './components/pages/Login';
import Admin from './components/adminComponentes/Admin';
import EditMarcas from './components/adminComponentes/marcas/EditMarcas';
import EditProducto from './components/adminComponentes/productos/EditProducto';
import EditUnidad from './components/adminComponentes/unidades/EditUnidad';
import ProductoDetail from './components/pages/ProductoDetail';
import FiltroMarcas from './components/pages/FiltroMarcas';
import OrdenCompra from './components/adminComponentes/ventas/OrdenCompra';
import MarcaPanel from './components/adminComponentes/marcas/MarcasPanel';
import './styles/index.css';
import ProductosPanel from './components/adminComponentes/productos/ProductosPanel';
import Ventas from './components/adminComponentes/ventas/Ventas';
import { AuthProvider } from './components/context/AuthContext';
import Register from './components/pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Contacto from './components/pages/Contacto';
import ContactosPanel from './components/adminComponentes/contactos/contactosPanel';



ReactDOM.render(
  <AuthProvider>
      <CarritoProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BodyCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productoDetail/:id" element={<ProductoDetail />} />
        <Route path="/unidad/:id" element={<EditUnidad />} />
        <Route path='/:marca' element={<FiltroMarcas />} />
        <Route path='/contacto' element={<Contacto />} />



        <Route element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/contactosPanel" element={<ContactosPanel />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/marcas/:id" element={<EditMarcas />} />
        <Route path="/productos/:id" element={<EditProducto />} />
        <Route path='/OrdenCompra' element={<OrdenCompra />} />
        <Route path='/marcasPanel' element={<MarcaPanel />} />
        <Route path='/productosPanel' element={<ProductosPanel />} />
        <Route path='/ventas' element={<Ventas />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  </CarritoProvider>
  </AuthProvider>,
  document.getElementById('root')
);