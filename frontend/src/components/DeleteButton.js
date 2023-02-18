import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button
      className="element__delete"
      aria-label="Delete"
      type="button"
      onClick={onClick}
    ></button>
  );
}

export default DeleteButton;
