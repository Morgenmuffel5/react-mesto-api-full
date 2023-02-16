import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card (props) {
    const user = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === user._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_disable'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === user._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`;

    function handleClick() {
        props.cardClick(props.card);
    }

    function onCardLike() {
        props.onCardLike(props.card)
    }

   /* function handleDeleteClick() {
        props.clickDelete(props.card._id);
    }*/
    function handleDeleteClick () {
        props.onCardDelete(props.card);
    }

    return (

        <li className="cards__item">
            <img className='cards__img' src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteClick}></button>
            <div className="cards__info">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="card__like-button">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={onCardLike}></button>
                    <div className="cards__like-rating">{props.card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card;