import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `places__like-button ${
    isLiked && "places__like-button_active"
  }`;

  function handleCardClick() {
    onCardClick.setSelectedCard(card);
    onCardClick.setIsImageOpen(true);
  }

  function handleDeleteClick() {
    onCardClick.setSelectedCard(card);
    onDeleteClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="places__card">
      {isOwn && (
        <button
          className="button places__delete-button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="button places__image"
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
      />
      <div className="places__item">
        <h2 className="places__name">{card.name}</h2>
        <div className="places__like-item">
          <button
            type="button"
            aria-label="Добавить в избранное"
            className={`button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          />
          <div className="places__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
