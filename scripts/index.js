import { elementTemplateOptions, validationOptions, initialCards } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const templateCards = document.querySelector('.elements');
const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup_edit');
const submitEditBtn = profilePopup.querySelector('.popup__button-save');
const cardPopup = document.querySelector('#popup-add');
const formEdit = profilePopup.querySelector('.popup__form');
const buttonClose = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const inputAbout = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const buttonAdd = document.querySelector('.profile__add-button');
const titleForm = cardPopup.querySelector('#popup_place');
const linkForm = cardPopup.querySelector('#popup_link');
const submitAddBtn = cardPopup.querySelector('.popup__button-save');
const formAdd = cardPopup.querySelector('.popup__form');
const overlays = Array.from(document.querySelectorAll('.popup'));

//функция редактирования и закрытия popup профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault(evt);
    const userNameNew = nameInput.value;
    const userJobNew = inputAbout.value;

    nameValue.textContent = userNameNew;
    jobValue.textContent = userJobNew;

    closePopup(profilePopup);
};


//функция добавления карт
function addCard(evt) {
    evt.preventDefault(evt);

    renderCard({
        name: titleForm.value,
        link: linkForm.value
    });

    formAdd.reset();
    validatorAddForm.setButtonInactive();

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

const renderCard = (element) => {
    const cardElement = createCard(element);
    templateCards.prepend(cardElement.generateCard(element));
};

function createCard (element) {
    const cardElement = new Card(element, elementTemplateOptions.templateSelector, openPopup);
    return cardElement;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    addHandleKey();
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandleKey();
}

buttonAdd.addEventListener('click', () => {
    openPopup(cardPopup);
});

//функция добавление карт из "коробки"
initialCards.forEach(renderCard);

const validatorAddForm = new FormValidator(validationOptions, formAdd, submitAddBtn);
validatorAddForm.enableValidation();

const validatorEditForm = new FormValidator(validationOptions, formEdit, submitEditBtn);
validatorEditForm.enableValidation();

buttonEdit.addEventListener('click', () => {

    nameInput.value = nameValue.textContent;
    inputAbout.value = jobValue.textContent;

    openPopup(profilePopup);
});

buttonClose.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => { closePopup(popup) });
});

overlays.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => {
        if (evt.target === overlay) {
            closePopup(overlay);
        };
    });
});


profilePopup.addEventListener('submit', handleFormSubmitEdit);
cardPopup.addEventListener('submit', addCard);
