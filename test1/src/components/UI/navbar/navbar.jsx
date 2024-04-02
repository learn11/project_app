import React from "react";
import cl from './navbar.module.css';
import useLoadMaterialIcons from "../../../API/icons.js";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Load the Material Icons stylesheet when the component mounts
  useLoadMaterialIcons();

  return (
    <nav className={cl.nav}>
      <Link to="/home" className={cl.nav__link}>
        <i className={[cl.nav__icon, "material-icons"].join(' ')}>dashboard</i>
        <span className={cl.nav__text}>home</span>
      </Link>
      <Link to="/about" className={cl.nav__link}>
        <i className={[cl.nav__icon, "material-icons"].join(' ')}>person</i>
        <span className={cl.nav__text}>סחורה</span>
      </Link>
      <Link to="/input" className={cl.nav__link}>
        <i className={[cl.nav__icon, "material-icons"].join(' ')}>devices</i>
        <span className={cl.nav__text}>הזמנות סחורה</span>
      </Link>
      <a href="" className={cl.nav__link}>
        <i className={[cl.nav__icon, "material-icons"].join(' ')}>lock</i>
        <span className={cl.nav__text}>מכירות</span>
      </a>
    </nav>
  );
};

export default Navbar;
