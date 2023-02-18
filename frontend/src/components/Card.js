import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import DeleteButton from "./DeleteButton";

function Card({ card, onCardClick, onConfirmPopupOpen, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i === currentUser.data._id);
  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__heart_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleConfirmPopupOpen = () => {
    onConfirmPopupOpen(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };
  return (
    <article className="element">
      {currentUser.data._id === card.owner.toString() && (
        <DeleteButton onClick={handleConfirmPopupOpen} />
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__image"
      />
      <div className="element__container">
        <p className="element__title">{card.name}</p>
        <div className="element__container-like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Like"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="element__like">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}
export default Card;
