import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
        onClick={(evt) => {
          evt.target === evt.currentTarget && props.onClose({});
        }}
      >
        <div className="popup__content">
          <button
            className="popup__close-button"
            aria-label="Close"
            type="button"
            onClick={props.onClose}
          ></button>
          <h2 className={`popup__title popup__title_${props.name}`}>{props.title}</h2>
          <form
            className={`popup__container popup__container_${props.name}`}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button
              className={`popup__button popup__button_${props.name}`}
              type="submit"
            >
              {props.textButton}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default PopupWithForm;
