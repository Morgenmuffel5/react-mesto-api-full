function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form onSubmit={props.onSubmit} className="popup__form popup__form_change_add-card" name={props.name}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="popup__button" type="submit">Сохранить</button>
                </form>
                <button className="popup__close-button" type="button"
                        aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;