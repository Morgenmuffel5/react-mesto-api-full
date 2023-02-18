import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [valid, setValid] = useState(false);
  const [errorMessageProfileName, setErrorMessageProfileName] = useState("");
  const [errorMessageProfileAbout, setErrorMessageProfileAbout] = useState("");

  useEffect(() => {
    setName(currentUser.data.name);
    setDescription(currentUser.data.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const handleInput = (e) => {
    if (e.target.name === "name") {
      if (!e.target.validity.valid) {
        setValid(false);
        setErrorMessageProfileName(e.target.validationMessage);
      } else {
        setErrorMessageProfileName("");
      }
      setName(e.target.value);
    } else if (e.target.name === "about") {
      if (!e.target.validity.valid) {
        setValid(false);
        setErrorMessageProfileAbout(e.target.validationMessage);
      } else {
        setErrorMessageProfileAbout("");
      }
      setDescription(e.target.value);
    } else if (!name || !description) {
      setValid(false);
    }

    if (e.target.closest("form").checkValidity()) {
      setValid(true);
    }
  };
  const handleClose = () => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setValid(false);
    setErrorMessageProfileName("");
    setErrorMessageProfileAbout("");
    onClose();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      valid={valid}
      title="Редактировать профиль"
      name="edit"
      textButton="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        id="popup-edit"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleInput}
        value={name || ""}
      />
      <div id="popup-edit-error" className="popup__input-error">
        <span className="popup__error-visible">{errorMessageProfileName}</span>
      </div>

      <input
        className="popup__input popup__input_type_about"
        id="about"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={handleInput}
        value={description || ""}
      />
      <div id="about-error" className="popup__input-error">
        <span className="popup__error-visible">{errorMessageProfileAbout}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
