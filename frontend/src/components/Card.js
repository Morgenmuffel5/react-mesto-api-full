import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import DeleteButton from "./DeleteButton";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((i) => i === currentUser.data._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  const handleClick = () => {
   props.onCardClick(props.card);
  };

  const handleConfirmPopupOpen = () => {
    props.onConfirmPopupOpen(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  return (
    <article className="element">
      {currentUser.data._id === props.card.owner.toString() && (
        <DeleteButton onClick={handleConfirmPopupOpen} />
      )}
      <img
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
        className="element__image"
      />
      <div className="element__container">
        <p className="element__title">{props.card.name}</p>
        <div className="element__container-like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Like"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="element__title-status">{props.card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}
export default Card;
