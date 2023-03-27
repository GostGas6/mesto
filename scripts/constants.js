export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const popupImage = document.querySelector('#popup_image');
export const imagePopup = popupImage.querySelector('.popup__image');
export const imagePopupHeading = popupImage.querySelector('.popup__text');

export const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup-form__input_invalid',
    errorClass: 'popup__error_active',
    errorText: '.popup__error',
    errorClosestParent: '.popup__input-section'
};

export const elementTemplateOptions = {
    templateSelector: 'element_template',
    elementSelector: '.element',
    elementTextSelector: '.element__title',
    deleteBtnSelector: '.element__del-button',
    likeBtnSelector: '.element__like-button',
    imgSelector: '.element__image',
    likeBtnClass: 'element_like-active'
};
