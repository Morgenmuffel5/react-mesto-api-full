import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <div className='profile__user' onClick={props.onEditAvatar}>
            <img
              src={currentUser.data.avatar}
              className='profile__avatar'
              alt='аватар'
            />
          </div>
          <div className='profile__container'>
            <div className='profile__container-title'>
              <h1 className='profile__title'>{currentUser.data.name}</h1>
              <button
                className='profile__info-button'
                onClick={props.onEditProfile}
                aria-label='Open'
                type='button'
              ></button>
            </div>
            <p className='profile__subtitle'>{currentUser.data.about}</p>
          </div>
        </div>
        <button
          className='profile__button'
          onClick={props.onAddPlace}
          aria-label='PlusCard'
          type='button'
        ></button>
      </section>

      <section className='elements'>
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onConfirmPopupOpen={props.onConfirmPopupOpen}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
