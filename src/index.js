import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './componentes/NavBar';
import Footer from './componentes/Footer';
import CardProduct from './componentes/CardProduct';

ReactDOM.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <CardProduct></CardProduct>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);
