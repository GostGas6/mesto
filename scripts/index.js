import Card from './Card.js'
import FormValidator from './FormValidator.js';

const initialCards = [
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
const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup-form__input_invalid',
    errorClass: 'popup__error_active',
    errorText: '.popup__error',
    errorClosestParent: '.popup__input-section'
};

const elementTemplateOptions = {
    templateSelector: 'element_template',
    elementSelector: '.element',
    elementTextSelector: '.element__title',
    deleteBtnSelector: '.element__del-button',
    likeBtnSelector: '.element__like-button',
    imgSelector: '.element__image',
    likeBtnClass: 'element_like-active'
};

const templateCards = document.querySelector('.elements');
const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup_edit');
const submitEditBtn = profilePopup.querySelector('popup__button-save');
const cardPopup = document.querySelector('#popup-add');
const buttonClose = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const inputAbout = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.popup__form');
const buttonAdd = document.querySelector('.profile__add-button');
const titleForm = cardPopup.querySelector('#popup_place');
const linkForm = cardPopup.querySelector('#popup_link');
// const cardTemplate = document.querySelector('#element_template').content;
const popupImage = document.querySelector('#popup_image');
const imagePopup = popupImage.querySelector('.popup__image');
const imagePopupHeading = popupImage.querySelector('.popup__text');
const imageButton = document.querySelector('#image-element');
const submitAddBtn = cardPopup.querySelector('.popup__button-save');
const formAdd = cardPopup.querySelector('.popup__form');
const overlays = Array.from(document.querySelectorAll('.popup'));


//функция добавления карт
function addCard(evt) {
    evt.preventDefault(evt);

    const item = {
        name: titleForm.value,
        link: linkForm.value
    }

    titleForm.value = ``;
    linkForm.value = ``;

    renderCard(item);

    formAdd.reset();
    validatorAddForm.setButtonInactive(submitAddBtn);

    closePopup(cardPopup);
};

const addHandleKey = () => {
    document.addEventListener('keydown', handleKey);
};

const removeHandleKey = () => {
    document.removeEventListener('keydown', handleKey);
};

const handleKey = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    };
};

overlays.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => {
        if (evt.target === overlay) {
            closePopup(overlay);
        };
    });
});

//рендер карт
const renderCard = (element) => {
    const createCard =  new Card(element, elementTemplateOptions.templateSelector, openPopup)
    templateCards.prepend(createCard.generateCard(element));
};

//функция добавление карт из "коробки"
initialCards.forEach(renderCard);

const validatorAddForm = new FormValidator(validationOptions, formAdd, submitAddBtn);
validatorAddForm.enableValidation;

const validatorEditForm = new FormValidator(validationOptions, profilePopup, submitEditBtn);
validatorEditForm.enableValidation;

function openPopup(popup) {
    popup.classList.add('popup_opened');
    addHandleKey();
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandleKey();
}

buttonClose.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

buttonAdd.addEventListener('click', function () {
    openPopup(cardPopup);
});

//функция редактирования и закрытия popup профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault(evt);
    const userNameNew = nameInput.value;
    const userJobNew = inputAbout.value;

    nameValue.textContent = userNameNew;
    jobValue.textContent = userJobNew;

    closePopup(profilePopup);
};

buttonEdit.addEventListener('click', () => {

    nameInput.value = nameValue.textContent;
    inputAbout.value = jobValue.textContent;

    openPopup(profilePopup);
});

profilePopup.addEventListener('submit', handleFormSubmitEdit);
cardPopup.addEventListener('submit', addCard);

export { validationOptions, initialCards, elementTemplateOptions, popupImage, imagePopup, imagePopupHeading };
