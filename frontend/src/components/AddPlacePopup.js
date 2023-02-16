import PopupWithForm from "./PopupWithForm";
import React from "react";
import {api} from "../utils/Api";

function AddPlacePopup(props) {

    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangePlace(e) {
        setPlace(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCards({
            place: place,
            link: link
        });
    }

    React.useEffect(() => {
      setLink('');
      setPlace('');
    }, [props.isOpen]);

    return(
        <PopupWithForm name='add-card'
                       title='Новое место'
                       children={
                           <>
                               <label className="popup__fieldset">
                                   <input value={place} onChange={handleChangePlace} id="popup__input-title" type="text"
                                          className="popup__input popup__input_value_place-name"
                                          name="place" placeholder="Название" minLength="2" maxLength="30"
                                          required /*noValidate*/ />

                                   <span className="popup__error popup__input-title-error"></span>
                               </label>

                               <label className="popup__fieldset">
                                   <input value={link} onChange={handleChangeLink} id="popup__input-url" type="url"
                                          className="popup__input popup__input_value_img"
                                          name="link"
                                          placeholder="Ссылка на картинку" required /*noValidate*/ />

                                   <span className="popup__error popup__input-url-error"></span>
                               </label>
                           </>
                       }
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}/>
    )
}

export default AddPlacePopup;