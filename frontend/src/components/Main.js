import avatar from "../images/avatar.jpg";
import React, { useEffect } from "react";
import {api} from '../utils/Api.js'
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
    
    const user = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img alt="аватар пользователя" src={user.avatar} className="profile__photo"/>
                        <div className="profile__hover"></div>
                    </div>
                    <div className="profile__text">
                        <div className="profile__name-cont">
                            <h1 className="profile__name">{user.name}</h1>
                            <button className="profile__change-button" type="button"
                                    aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__specialization">{user.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
            </section>

            <section className="cards">
                <ul className="cards__list">
                    {props.cards.map((card, i) => (
                            <Card key={card._id}  card={card} cardClick={props.onCardClick} clickDelete={props.onDeleteClick} onCardLike={props.onCardLike}
                                  onCardDelete={props.onCardDelete}/>
                    ))}

                </ul>
            </section>
        </main>
    )
}

export default Main;