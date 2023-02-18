import React, { useState } from "react";

function Login({ onSubmit }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };
  return (
    <div className="auth">
      <section className="auth__form">
        <h1 className="auth__title">Вход</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <fieldset className="auth__info">
            <input
              value={data.email}
              onChange={handleChange}
              id="email-input"
              className="auth__input auth__input_type_email"
              type="text"
              placeholder="Email"
              name="email"
              required
            />
            <input
              value={data.password}
              onChange={handleChange}
              id="password-input"
              className="auth__input auth__input_type_password"
              type="password"
              placeholder="Пароль"
              name="password"
              required
            />
          </fieldset>
          <button
            className="auth__submit-button auth__submit-button_type_submit"
            type="submit"
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
