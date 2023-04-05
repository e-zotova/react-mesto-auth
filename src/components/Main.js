import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onDeleteClick
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <div className="profile__overlay">
            <a
              className="profile__edit-avatar"
              href="/#"
              onClick={onEditAvatar}
            >
              {" "}
            </a>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать"
              className="button profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="button profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
