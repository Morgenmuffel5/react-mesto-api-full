import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import Main from "./Main";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit-profile'
                       title='Редактировать профиль'
                       children={
                           <>
                               <label className="popup__fieldset">
                                   <input value={name || ''} id="popup__input-name" type="text"
                                          className="popup__input popup__input_value_name"
                                          name="name" required minLength="2" maxLength="40" onChange={handleChangeName}/*noValidate*/ />

                                   <span className="popup__error popup__input-name-error"></span>
                               </label>

                               <label className="popup__fieldset">
                                   <input value={description || ''} onChange={handleChangeDescription} id="popup__input-about" type="text"
                                          className="popup__input popup__input_value_about"
                                          name="about" required minLength="2" maxLength="200" /*noValidate*/ />

                                   <span className="popup__error popup__input-about-error"></span>
                               </label>
                           </>
                       }
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        />
    )

}


export default EditProfilePopup;