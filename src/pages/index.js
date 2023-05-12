import './index.css';

import { elementTemplateOptions, validationOptions, initialCards, profileSelectors, popupSelector } from '../utils/constants.js';

import Card from '../scripts/card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popup_edit');
const cardPopup = document.querySelector('#popup-add');
const formEdit = profilePopup.querySelector('.popup__form');
const buttonAdd = document.querySelector('.profile__add-button');
const formAdd = cardPopup.querySelector('.popup__form');
const titleForm = profilePopup.querySelector('#popup_name');
const linkForm = profilePopup.querySelector('#popup_about');


const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileAboutSelector: '.profile__subtitle'
})


const popupImage = new PopupWithImage(popupSelector.imagePopup);

const createCard = (element) => {

    const newCard = new Card(element, 'element_template', (name, link) => {
        popupImage.open(element, name, link);
    });
    return newCard.generateCard();
}


const cardSection = new Section({
    items: initialCards,
    renderer: (element) => {
        cardSection.addItem(createCard(element))
    }
},
    elementTemplateOptions.containerSelector
);

const popupProfile = new PopupWithForm(
    '#popup_edit',
    {
        submitCallback: (values) => {
            userInfo.setUserInfo(values);
            popupProfile.close();
        }
    });

const popupAddCard = new PopupWithForm(
    '#popup-add',
    {
        submitCallback: (values) => {
            cardSection.addItem(createCard(values));
            validatorAddForm.setButtonInactive();
            popupAddCard.close()
        }
    }
);

buttonAdd.addEventListener('click', () => {
    validatorAddForm.setButtonInactive()
    popupAddCard.open();
});

buttonEdit.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo();
    titleForm.value = name;
    linkForm.value = job;
    popupProfile.open()
});

cardSection.render();

const validatorAddForm = new FormValidator(validationOptions, formAdd);
validatorAddForm.enableValidation();

const validatorEditForm = new FormValidator(validationOptions, formEdit);
validatorEditForm.enableValidation();

popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
