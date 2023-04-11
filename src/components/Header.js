import React from "react";
import headerLogo from "../images/header-logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ title, route, onClick }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип Место Россия"
      />
      <Link to={route} className="header__link" type="button" onClick={onClick}>
        {title}
      </Link>
    </header>
  );
}

export default Header;
