import * as auth from "../utils/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    auth.getContent(token).then((res) => {
      let email = res.data.email;
      handleLogin({ email });
      navigate("/");
    });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    if (!formValue.password || !formValue.username) {
      setErrorMessage("Имя пользователя и пароль должны быть заполнены");
    }

    auth.authorize(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        handleLogin({ email });
        navigate("/");
      }
    });
  };
  return (
    <div className="login">
      <h2 className="popup__header">Вход</h2>
      <form className={`popup__form`} onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          className="input login__input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />
        <span className="login__input-error"></span>
        <input
          id="password"
          name="password"
          type="password"
          className="input login__input"
          placeholder="Пароль"
          value={formValue.username}
          onChange={handleChange}
        />
        <span className="login__input-error"></span>
        <p className="login__error">{errorMessage}</p>
        <button
          type="submit"
          className="button popup__save-button login__save-button"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
