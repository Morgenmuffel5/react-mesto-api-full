import React from "react";
import { Route, Link, Switch } from "react-router-dom";

function Header({ emailUser, onSignOut }) {
  return (
    <header className="header">
      <div alt="Логотип проекта Место" className="header__logo"></div>
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <div className="header__user">
            <p className="header__user-email">{emailUser}</p>
            <Link to="/sign-in" className="header__link" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
