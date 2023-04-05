import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isOpen, card, onCardDelete, isLoading, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="popup_delete-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      saveButton="Да"
      isLoading={isLoading}
    >
      <label
        className="popup__form popup__delete-card-form"
        name="delete-card"
      />
    </PopupWithForm>
  );
}

export default PopupWithConfirmation;
