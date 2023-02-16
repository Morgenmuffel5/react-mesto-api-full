

function InfoTooltip (props) {
    return(
        <div className={`popup ${props.isOpen? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className={`popup__icon ${props.isOk ? 'popup__icon_ok' : ''}`}></div>
                <p className="popup__text">
                    {props.isOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
                <button className="popup__close-button" type="button"
                        aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;