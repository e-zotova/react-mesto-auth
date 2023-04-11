function Login({ onSubmit, handleLogin }) {
  return (
    <div className="login">
      <h2 className="popup__header">Вход</h2>
      <form className={`popup__form`} onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          className="input login__input"
          placeholder="Email"
        />
        <span className="login__input-error"></span>
        <input
          id="password"
          type="password"
          className="input login__input"
          placeholder="Пароль"
        />
        <span className="login__input-error"></span>
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
