import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
    props.onClose();
  }

  return (
    <PopupWithForm
      card={props.card}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onConfirmPopupOpen={props.onConfirmPopupOpen}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="confirm"
      textButton="Да"
    ></PopupWithForm>
  );
}

export default DeletePopup;
