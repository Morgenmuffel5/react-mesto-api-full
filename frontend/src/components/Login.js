import React, {useState} from "react";
import Header from "./Header";

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailUpdate(e) {
        setEmail(e.target.value)
    }

    function handlePasswordUpdate(e) {
        setPassword(e.target.value)
    }

    function submitLogin(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.onLogin({
            password: password,
            email: email
        });
    }

    React.useEffect(() => {
        props.onUpdateHeader(false);
    }, []);

    return (
        <>
            <div className="login">
                <p className="login__title">
                    Вход
                </p>
                <form className="login__form" onSubmit={submitLogin}>
                    <input placeholder='Email' required id="input-email" className='login__input' name="email"
                           type="text" value={email || ''} onChange={handleEmailUpdate}/>
                    <input placeholder='Пароль' required id="input-password" name="password" className='login__input'
                           type="password" value={password || ''} onChange={handlePasswordUpdate}/>
                    <div className="login__button-cont">
                        <button type="submit" className="login__button">Войти</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;