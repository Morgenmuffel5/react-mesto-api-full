import React from "react";

function DeleteButton(props) {
  return (
    <button
      className="element__delete"
      aria-label="Delete"
      type="button"
      onClick={props.onClick}
    ></button>
  );
}

export default DeleteButton;
