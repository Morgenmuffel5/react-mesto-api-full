import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({
  card,
  isOpen,
  onClose,
  onConfirmPopupOpen,
  onDeleteCard,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
    onClose();
  }

  return (
    <PopupWithForm
      card={card}
      isOpen={isOpen}
      onClose={onClose}
      onConfirmPopupOpen={onConfirmPopupOpen}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="confirm"
      textButton="Да"
    ></PopupWithForm>
  );
}

export default DeletePopup;
