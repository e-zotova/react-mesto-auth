import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image-view ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__big-image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
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

export default ImagePopup;
