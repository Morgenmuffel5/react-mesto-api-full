import {Link} from 'react-router-dom'
import React from "react";


function Header(props) {

    return (
        <header className="header">
            <a href="src/components/App#" className="header__logo"></a>
            <p className="header__email">{props.userEmail}</p>
            <Link to="/sign-up"
                  className={`header__link ${props.loggedIn || props.isRegistration ? 'header__link_unvisible' : ''}`}>
                Регистрация
            </Link>
            <Link to="/sign-in"
                  className={`header__link ${props.loggedIn || !props.isRegistration ? 'header__link_unvisible' : ''}`}>
                Вход
            </Link>
            <Link to="/sign-in" className={`header__link ${props.loggedIn ? '' : 'header__link_unvisible'}`}
                  onClick={props.signOut}>
                Выйти
            </Link>
        </header>

    )
}

export default Header;