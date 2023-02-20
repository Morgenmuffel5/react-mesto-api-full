import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        Object.keys(props.card).length !== 0
          ? "popup popup_open-photo popup_opened"
          : "popup popup_open-photo"
      }
      id="popup-pictures"
      onClick={props.onClose}
    >
      <div className="popup__overlay"></div>
      <div className="popup__photo-container">
        <img src={props.card.link} alt={props.card.name} className="popup__photo" />
        <p className="popup__photo-name">{props.card.name}</p>
        <button type="button" className="popup__close-button"></button>
      </div>
    </div>
  );
}

export default ImagePopup;
