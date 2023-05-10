import './index.css';

import { elementTemplateOptions, validationOptions, initialCards, profileSelectors } from '../scripts/constants.js';

import Card from '../scripts/card.js';
import FormValidator from '../scripts/FormValidator.js';
import PicturePopup from '../scripts/PicturePopup.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup_edit');
const submitEditBtn = profilePopup.querySelector('.popup__button-save');
const cardPopup = document.querySelector('#popup-add');
const formEdit = profilePopup.querySelector('.popup__form');
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const buttonAdd = document.querySelector('.profile__add-button');
const submitAddBtn = cardPopup.querySelector('.popup__button-save');
const formAdd = cardPopup.querySelector('.popup__form');
const titleForm = profilePopup.querySelector('#popup_name');
const linkForm = profilePopup.querySelector('#popup_about');


const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileAboutSelector: '.profile__subtitle'
})

const newCard = (element) => {

    const createCard = new Card(element, 'element_template', () => {
        (link, name) => popupImage.open({name, link});
        popupImage.openPopup(element);
    });
    return createCard.generateCard();
}

const popupImage = new PicturePopup('.popup-image');


const cardSection = new Section({
    items: initialCards,
    renderer: (element) => {
        cardSection.addItem(newCard(element))
    }
},
    elementTemplateOptions.containerSelector
);

const popupProfile = new PopupWithForm(
    '#popup_edit',
    {
        submitCallback: (values) => {
            userInfo.setUserInfo(values);
            popupProfile.closePopup();
        }
    });

const popupAddCard = new PopupWithForm(
    '#popup-add',
    {
        submitCallback: (values) => {
            cardSection.addItem(newCard(values));
            validatorAddForm.setButtonInactive();
            popupAddCard.closePopup()
        }
    }
);

buttonAdd.addEventListener('click', () => {
    validatorAddForm.setButtonInactive()
    popupAddCard.openPopup();
});

buttonEdit.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    titleForm.value = name;
    linkForm.value = job;
    popupProfile.openPopup()
});

cardSection.render();

const validatorAddForm = new FormValidator(validationOptions, formAdd);
validatorAddForm.enableValidation();

const validatorEditForm = new FormValidator(validationOptions, formEdit);
validatorEditForm.enableValidation();

popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();