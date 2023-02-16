function ImagePopup (props) {

    return(
        <div className={`popup popup_type_${props.name} ${props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_open-image">
                <img src={props.card.link} alt={props.card.name} className="popup__img" />
                    <p className="popup__caption">{props.card.name}</p>
                    <button className="popup__close-button popup__close-button_close_image" type="button"
                            aria-label="Закрыть" onClick={props.onClose}></button>
            </div>
        </div>
    )
}
export default ImagePopup;