import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";


function EditAvatarPopup(props) {


    const avatarRef = React.useRef('');

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm name='avatar' title='Обновить аватар'
                       children={
                           <>
                               <label className="popup__fieldset">
                                   <input ref={avatarRef} id="popup__input-avatar" type="url"
                                          className="popup__input popup__input_value_avatar"
                                          name="avatar" placeholder="Ссылка" required /*noValidate*/ />

                                   <span className="popup__error popup__input-avatar-error"></span>
                               </label>
                           </>
                       }
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        />
    )
}

export default EditAvatarPopup
