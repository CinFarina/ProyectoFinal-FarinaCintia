// src/assets/components/NavBar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget'; // <-- Importa el CartWidget

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>Librería Scorpio</h1>
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/artistica" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Artística
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/comercial" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Comercial
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/escolar" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Escolar
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Carrito
          </NavLink>
        </li>
        {/* Agrega el CartWidget aquí, usualmente al final de los enlaces o en un lugar visible */}
        <li>
          <CartWidget /> {/* <-- Agrega el CartWidget aquí */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;