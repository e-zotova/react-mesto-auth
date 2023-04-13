import React, { useState } from "react";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    if (!email || !password) {
      setErrorMessage("Имя пользователя и пароль должны быть заполнены");
    } else {
      onRegister(email, password);
    }
  };

  return (
    <div className="login">
      <h2 className="popup__header">Регистрация</h2>
      <form className="popup__form" onSubmit={onSubmit}>
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
          value={formValue.password}
          onChange={handleChange}
        />
        <span className="login__input-error"></span>
        <p className="login__error">{errorMessage}</p>
        <button
          type="submit"
          className="button popup__save-button login__save-button"
        >
          Зарегистрироваться
        </button>
        <a className="login__registered" href="/sign-in">
          Уже зарегистрированы? Войти
        </a>
      </form>
    </div>
  );
}

export default Register;
