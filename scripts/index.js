import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { elementTemplateOptions, validationOptions, initialCards } from './constants.js';

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
const cardTemplate = document.querySelector('#element_template').content;
const imageButton = document.querySelector('#image-element');
const submitAddBtn = cardPopup.querySelector('.popup__button-save');
const formAdd = cardPopup.querySelector('.popup__form');
const overlays = Array.from(document.querySelectorAll('.popup'));


//функция добавления карт
function addCard(evt) {
    evt.preventDefault(evt);

    renderCard({
        name: titleForm.value,
        link: linkForm.value
    });

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
    const createCard = new Card(element, elementTemplateOptions.templateSelector, openPopup)
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
