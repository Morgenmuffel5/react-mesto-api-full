import React from "react";
import successfully from "../images/successfully.svg";
import unsuccessfully from "../images/unsuccessfully.svg";

function InfoTooltipPopup(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close-button"
          aria-label="Close"
          type="button"
          onClick={props.onClose}
        ></button>

        <div className="popup__request-status">
          <img
            className="popup__sucess-icon"
            src={props.isRequestStatus ? successfully : unsuccessfully}
            alt="sign"
          />
          <h2 className="popup__title popup__title-status">{props.text}</h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltipPopup;
