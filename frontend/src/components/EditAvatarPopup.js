import React, { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [valid, setValid] = useState(false);
  const [errorMessageAvatar, setErrorMessageAvatar] = useState("");
  const avatarRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
    setValid(false);
  };

  const handleInput = (e) => {
    if (!e.target.validity.valid || avatarRef.current.value === "") {
      setValid(false);
      setErrorMessageAvatar(e.target.validationMessage);
    } else {
      setErrorMessageAvatar("");
    }
    if (e.target.closest("form").checkValidity()) {
      setValid(true);
    }
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      valid={valid}
      title="Обновить аватар"
      name="avatar"
      textButton="Сохранить"
    >
      <input
        className="popup__input popup__input_type_link"
        id="lavatar"
        name="avatar"
        type="url"
        minLength="2"
        required
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        onInput={(e) => handleInput(e)}
      />
      <div id="lavatar-error" className="popup__input-error">
        <span className="popup__error-visible">{errorMessageAvatar}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
