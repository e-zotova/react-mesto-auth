import React from "react";
import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Header({ userData: { email } }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип Место Россия"
      />
      {pathname === "/" && (
        <div className="header__profile">
          <p className="header__link">{email}</p>
          <Link
            to="/sign-in"
            type="button"
            className="header__signout"
            onClick={signOut}
          >
            Выйти
          </Link>
        </div>
      )}
      {pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link" type="button">
          Регистрация
        </Link>
      )}
      {pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link" type="button">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
