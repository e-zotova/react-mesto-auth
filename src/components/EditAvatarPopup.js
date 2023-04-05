import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="avatar-url"
          type="url"
          name="avatar"
          ref={avatarRef}
          className="input input_type_avatar-image"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="avatar-url-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
