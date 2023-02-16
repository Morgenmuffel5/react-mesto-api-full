import React from "react";
import {Link} from 'react-router-dom'

function Register (props) {


    const [formInputs, setFormInputs] = React.useState({
        email: '',
        password: '',
    })


    function handleUpdate (e) {
        const { name, value } = e.target
        setFormInputs((prevState) => ({ ...prevState, [name]: value }))
    }

    function createNewAccount(e) {
        e.preventDefault();
        props.onRegister(formInputs);
    }


    React.useEffect(() => {
        props.onUpdateHeader(true);
    }, []);

    return (
        <>
            <div className="login">
                <p className="login__title">
                    Регистрация
                </p>
                <form className="login__form" onSubmit={createNewAccount}>
                    <input placeholder='Email' required id="input-email" className='login__input' name="email" type="text" value={formInputs.email ||''} onChange={handleUpdate} />
                    <input placeholder='Пароль' required id="input-password" name="password" className='login__input' type="password" value={formInputs.password || ''} onChange={handleUpdate} />
                    <div className="login__button-cont">
                        <button type="submit" className="login__button">Зарегистрироваться</button>
                    </div>
                </form>
                <div className="login__cont">
                    <Link to="sign-in" className="login__login-link">
                        Уже зарегистрированы? Войти
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Register;