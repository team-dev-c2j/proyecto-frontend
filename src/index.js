import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './componentes/NavBar';
import Footer from './componentes/Footer';
import Body from './componentes/Body';


ReactDOM.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <Body></Body>
    <Footer></Footer>
  </React.StrictMode>,
  document.getElementById('root')
);
