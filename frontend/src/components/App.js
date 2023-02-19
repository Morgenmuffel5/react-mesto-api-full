import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ data: {} });
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = React.useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => history.push('/'));
    }
  }, [loggedIn, history, email]);

 /* function handleLogin() {
    setLoggedIn(true);
  }*/

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(([userData, cards]) => {
            setCurrentUser(userData);
              setCards(cards);
          })
          .catch(err => {
            console.log(err)
          });
    }
  }, [loggedIn]);


  /*useEffect(() => {
    const closeEscape = (evt) => {
      evt.key === 'Escape' && closeAllPopups();
    };
    if (
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      selectedCard ||
      card
    ) {
      document.addEventListener('keydown', closeEscape);
    }
    return () => document.removeEventListener('keydown', closeEscape);
  });*/

  const handleLogin = (data) => {
    auth.logInCurrentUser(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
      })
      .then(() => {
        setLoggedIn(true);
      })
      .then(() => history.push('/'))
      .catch((err) => {
        setIsSuccessTooltipStatus(false);
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        handleInfotooltipPopupOpen();
        console.log(err);
      });
  };

  const handleCreateAccount = (data) => {
    auth.registrateNewUser(data)
      .then((res) => {
        if (res) {
          setIsSuccessTooltipStatus(true);
          setTextInfoTooltip('Вы успешно зарегистрировались!');
          handleInfotooltipPopupOpen();
        }
      })
      .then(() => {
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessTooltipStatus(false);
        setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
        handleInfotooltipPopupOpen();
      });
  };

  function handleConfirmPopupOpen(card) {
    setIsOpenConfirmPopup(true);
    setCard(card);
  }

  function handleInfotooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser.data._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(() => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
    setCard({});
    setIsOpenConfirmPopup(false);
    setIsInfoTooltipPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (user) => {
    return api.saveNewUserInfo(user)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (userAvatar) => {
    return api.changeAvatar(userAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    return api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in')
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header emailUser={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onConfirmPopupOpen={handleConfirmPopupOpen}
          />
          <Route path='/sign-up'>
            <Register onSubmit={handleCreateAccount} />
          </Route>
          <Route path='/sign-in'>
            <Login onSubmit={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
      </div>

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipPopupOpen}
        isRequestStatus={isSuccessTooltipStatus}
        text={textInfoTooltip}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <DeletePopup
        card={card}
        isOpen={isOpenConfirmPopup}
        onDeleteCard={handleCardDelete}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
