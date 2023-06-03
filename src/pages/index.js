import './index.css';

import { elementTemplateOptions, validationOptions, initialCards, profileSelectors, popupSelector, formSelectors } from '../utils/constants.js';

import Api from '../components/Api';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
const formAvatar = document.forms[formSelectors.formAvatar];
const buttonAvatar = document.querySelector(profileSelectors.buttonAvatarSelector);
const buttonAvatarSubmit = formAvatar.querySelector(formSelectors.submit);

let userCurrentId;

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-66/',
    headers: {
        authorization: '9ba3c65d-9fc0-499b-9856-0cae59cb26f0',
        'content-type': 'application/json'
    }
});

const userInfo = new UserInfo({
    profileNameSelector: profileSelectors.nameSelector,
    profileAboutSelector: profileSelectors.aboutSelector,
    profileAvatarSelector: profileSelectors.avatarSelector
})

const cardSection = new Section({
    // items: initialCards,
    renderer: (element) => {
        cardSection.addItemsReverse(createCard(element))
    }
},
    elementTemplateOptions.containerSelector
);


const popupProfile = new PopupWithForm(
    popupSelector.editProfile,
    {
        submitCallback: (values) => {
            popupProfile.renderLoading(true, 'Сохранение...');
            api.patchProfile(values)
                .then((values) => {
                    userInfo.setUserInfo(values);
                    popupProfile.close();
                })
                .catch((err) => console.log(err))
                .finally(() => popupProfile.renderLoading(false))
        }
    });

const popupAddCard = new PopupWithForm(
    popupSelector.addCard,
    {
        submitCallback: (values) => {
            popupAddCard.renderLoading(true, 'Сохранение...')
            api.postCard({
                name: values.place,
                link: values.link
            })
                .then((newCard) => {
                    cardSection.addItem(createCard(newCard));
                    validatorAddForm.setButtonInactive();
                    popupAddCard.close()
                })
                .catch(err => console.log(err))
                .finally(() => popupAddCard.renderLoading(false));
        }
    }
);

const popupImage = new PopupWithImage(popupSelector.imagePopup);

const popupChangeAvatar = new PopupWithForm(
    popupSelector.changeAvatar,
    {
        submitCallback: (values) => {
            popupChangeAvatar.renderLoading(true, 'Сохранение...');

            api.setUserAvatar(values)
                .then((res) => {
                    userInfo.setUserInfo(res);
                    popupChangeAvatar.close()
                })
                .catch(err => console.log(err))
                .finally(() => popupChangeAvatar.renderLoading(false))
        }
    }
);

const popupConfirmDelete = new PopupWithConfirm(
    popupSelector.confirmDelete,
    {
        submitCallback: ({ card }) => {
            popupConfirmDelete.renderLoading(true, 'Удаление...');

            api.deleteCard(card.cardId)
                .then(() => {
                    card.deleteCard()
                })
                .then(() => popupConfirmDelete.close())
                .catch(err => console.log(err))
                .finally(() => popupConfirmDelete.renderLoading(false))
        }
    }
);


const createCard = (element) => {

    const newCard = new Card(element, elementTemplateOptions.templateSelector, {
        userId: userCurrentId,
        handleCardClick: () => {
            popupImage.open(element)
        }, confirmDelete: () => {
            popupConfirmDelete.open(newCard)
        }, handleLikeCard: () => {
            api.like(newCard.cardId, newCard.isLiked(newCard.likes))
                .then(res => {
                    newCard.like(res)
                })
                .catch(err => console.log(err))
        }
    }
    );

    return newCard.generateCard();
};

const renderPage = () => {
    Promise.all([
        api.getCard(),
        api.getProfile()
    ]).then(([cardResult, profileResult]) => {
        userCurrentId = profileResult._id;
        console.log(cardResult)
        cardSection.render(cardResult)
        userInfo.setUserInfo(profileResult)
    })
        .catch(err => console.log(err))
};

renderPage();


buttonAdd.addEventListener('click', () => {
    validatorAddForm.setButtonInactive()
    popupAddCard.open();
});

buttonEdit.addEventListener('click', () => {
    popupProfile.fillInputs(userInfo.getUserInfo())
    popupProfile.open()
});

buttonAvatar.addEventListener('click', () => {
    validatorChangeAvatar.setButtonInactive()
    popupChangeAvatar.open()
})


popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupChangeAvatar.setEventListeners();
popupConfirmDelete.setEventListeners();


const validatorAddForm = new FormValidator(validationOptions, formAdd);
validatorAddForm.enableValidation();

const validatorEditForm = new FormValidator(validationOptions, formEdit);
validatorEditForm.enableValidation();

const validatorChangeAvatar = new FormValidator(validationOptions, formAvatar, buttonAvatarSubmit);
validatorChangeAvatar.enableValidation()
