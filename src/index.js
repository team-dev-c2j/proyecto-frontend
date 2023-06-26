import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './componentes/NavBar';
import Footer from './componentes/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './componentes/Login';
import Admin from './componentes/Admin';
import BodyCard from './componentes/BodyCard';
import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<BodyCard></BodyCard>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/admin" element={<Admin></Admin>} />
      </Routes>
    </BrowserRouter>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);
