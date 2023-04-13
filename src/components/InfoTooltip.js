import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, loggedIn, onClose }) {
  return (
    <div className={`popup popup_info-tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="login__result" src={loggedIn ? success : fail} alt="Статус регистрации" />
        <div className="login__result_text">
          {loggedIn
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </div>
        <button
          type="reset"
          aria-label="Закрыть"
          className="button popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
