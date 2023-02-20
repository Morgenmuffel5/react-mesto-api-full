import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [valid, setValid] = useState(false);
  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageLink, setErrorMessageLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
    setValid(false);
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      if (!e.target.validity.valid) {
        setValid(false);
        setErrorMessageName(e.target.validationMessage);
      } else {
        setErrorMessageName("");
      }
    } else if (e.target.name === "link") {
      if (!e.target.validity.valid) {
        setValid(false);
        setErrorMessageLink(e.target.validationMessage);
      } else {
        setErrorMessageLink("");
      }
    } else if (!name || !link) {
      setValid(false);
    }

    if (e.target.closest("form").checkValidity()) {
      setValid(true);
    }
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      valid={valid}
      title="Новое место"
      name="card"
      textButton="Создать"
    >
      <input
        className="popup__input popup__input_type_title"
        id="title-card"
        name="name"
        type="text"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onInput={(e) => handleInput(e)}
      />
      <div id="title-card-error" className="popup__input-error">
        <span className="popup__error-visible">{errorMessageName}</span>
      </div>

      <input
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        type="url"
        minLength="2"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onInput={(e) => handleInput(e)}
      />
      <div id="link-error" className="popup__input-error">
        <span className="popup__error-visible">{errorMessageLink}</span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
