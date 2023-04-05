import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  onSubmit,
  saveButton,
  isLoading,
  children,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form className={`popup__form ${name}`} name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="button popup__save-button">
            {isLoading ? "Сохранение..." : saveButton || "Сохранить"}
          </button>
        </form>
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

export default PopupWithForm;
