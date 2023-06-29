import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/NavBar';
import Footer from './componentes/Footer';
import Login from './componentes/Login';
import Admin from './componentes/Admin';
import BodyCard from './componentes/BodyCard';
import './styles/index.css';
import EditMarcas from './componentes/adminComponentes/EditcMarcas';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BodyCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/marcas/:id" element={ <EditMarcas/> } />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
