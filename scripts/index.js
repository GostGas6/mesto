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

const templateItem = document.querySelector('#element_template').content;
const templateCards = document.querySelector('.elements');
const openEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const aboutInput = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.userData');
const popupForm = document.querySelector('.popup-form');
const openAdd = document.querySelector('.profile__add-button');
const closeEditForm = document.querySelector('.popup-form__close-button');
const nameInputForm = document.querySelector('#popup_place');
const placeInputForm = document.querySelector('#popup_link');
const titleForm = document.querySelector('#popup_place');
const linkForm = document.querySelector('#popup_link');
const elementTitle = document.querySelector('.element__title');
const elementLink = document.querySelector('.element__image');
const saveCardButton = document.querySelector('.popup-form__button-save');
const cardTemplate = document.querySelector('#element_template').content;
const cardArray = [];

//add cards-box
initialCards.forEach((element) => {
    const addCard = templateItem.cloneNode(true);
    addCard.querySelector('.element__title').textContent = element.name;
    addCard.querySelector('.element__image').src = element.link;
    templateCards.append(addCard);
})

//Add
function addCard(evt) {
    evt.preventDefault(evt);

    cardArray.unshift({
        name: titleForm.value,
        link: linkForm.value
    });

    titleForm.value = ``;
    linkForm.value = ``;

    renderCard(cardArray[0]);
    closeAddButton(popupForm);
};

//Render cards
const renderCard = (element) => {
    templateCards.prepend(generateCard(element));
};

function generateCard(element) {
    const elementItem = cardTemplate.querySelector('.element').cloneNode(true);
    const delButton = elementItem.querySelector('.element__del-button');
    const likeBtn = elementItem.querySelector('.element__like-button');
    const image = elementItem.querySelector('.element__image');
    const name = element.name;
    const link = element.link;

    elementItem.querySelector('.element__image').textContent = name;
    image.src = link;
    image.alt = name;

    delButton.addEventListener('click', hundleDeleteElement);

    likeBtn.addEventListener('click', activateLikeButton);

    image.addEventListener('click', openPopupImg);

    return elementItem;
};

//function delete cards button
const hundleDeleteElement = (event) => {
    event.target.closest('.element').remove();
};

//Img popup
const popupImage = document.querySelector('#popup_image');
const imagePopup = popupImage.querySelector('.popup_image__image');
const imagePopupHeading = popupImage.querySelector('.popup_image__text');
const openPopupImg = (event) => {
    const imageLink = event.target.getAttribute('src'); 
    const imageHeading = event.target.closest('.element').querySelector('.element__title').textContent; 
  
    imagePopup.setAttribute('src', imageLink);
    imagePopup.setAttribute('alt', imageHeading);
    imagePopupHeading.textContent = imageHeading;
  
    openAddButton(popupImage);
  };
  

//function like button on card's
const activeLikeButton = document.querySelector('.element__like-button');
function activateLikeButton() {
    activeLikeButton.classList.toggle('element_like-active');
};
activeLikeButton.addEventListener('click', activateLikeButton);


//функция закрытия popup профиля
function closeEditClick() {
    popup.classList.remove('popup_opened');
};

//функция открытия и трансфера данных popup
function transferText() {
    nameInput.value = nameValue.textContent;
    aboutInput.value = jobValue.textContent;
    popup.classList.add('popup_opened');
};

//функция редактирования и закрытия popup профиля
function handleFormSubmit(event) {
    event.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = aboutInput.value;
    closeEditClick();
};

function openAddButton() {
    popupForm.classList.add('popup-form_opened');
};

function closeAddButton() {
    popupForm.classList.remove('popup-form_opened');
};


openAdd.addEventListener('click', openAddButton);
closeEditForm.addEventListener('click', closeAddButton);
openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);
popupForm.addEventListener('submit', addCard);