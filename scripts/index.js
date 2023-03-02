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

const templateCards = document.querySelector('.elements');
const openEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const aboutInput = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.userData');
const popupForm = document.querySelector('#popup-add');
const openAdd = document.querySelector('.profile__add-button');
const closeEditForm = document.querySelector('.popup-form__close-button');
const titleForm = popupForm.querySelector('#popup_place');
const linkForm = popupForm.querySelector('#popup_link');
const cardTemplate = document.querySelector('#element_template').content;
const popupImage = document.querySelector('#popup_image');
const imagePopup = popupImage.querySelector('.popup-image__image');
const imagePopupHeading = popupImage.querySelector('.popup-image__text');
const popupImg = document.querySelector('.popup-image');
const imageButton = document.querySelector('#image-element');
const closeImageButton = document.querySelector('#popup_close-image');

const cardArray = [];


//функция редактирования и закрытия popup профиля
function handleFormSubmit(event) {
    event.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = aboutInput.value;
    closeEditClick();
};


//функция добавления карт
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


//функция кнопки лайка
function activateLikeButton(event) {
    const eventLikeButton = event.target;
    eventLikeButton.classList.toggle('element_like-active');
};


//функция кнопки удаления
const hundleDeleteElement = (event) => {
    event.target.closest('.element').remove();
};

//рендер карт
const renderCard = (element) => {
    templateCards.prepend(generateCard(element));
};

function generateCard(element) {
    const elementItem = cardTemplate.querySelector('.element').cloneNode(true);
    const delButton = elementItem.querySelector('.element__del-button');
    const likeButton = elementItem.querySelector('#like');
    const image = elementItem.querySelector('#image-element');
    const name = element.name;
    const link = element.link;

    elementItem.querySelector('#element-name').textContent = name;
    image.src = link;
    image.alt = name;

    delButton.addEventListener('click', hundleDeleteElement);

    likeButton.addEventListener('click', activateLikeButton);

    image.addEventListener('click', openPopupImg);


    return elementItem;
};

//popup картинок
function openImagePopup() {
    popupImg.classList.add('popup_image_opened');
}

function closeImagePopup() {
    popupImg.classList.remove('popup_image_opened');
};

const openPopupImg = (event) => {
    const imageLink = event.target.getAttribute('src');
    const imageHeading = event.target.closest('.element').querySelector('#element-name').textContent;

    imagePopup.setAttribute('src', imageLink);
    imagePopup.setAttribute('alt', imageHeading);
    imagePopupHeading.textContent = imageHeading;

    openImagePopup(popupImage);
};


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


function openAddButton() {
    popupForm.classList.add('popup-form_opened');
};

function closeAddButton() {
    popupForm.classList.remove('popup-form_opened');
};

//функция добавление карт из "коробки"
initialCards.forEach(renderCard);

closeImageButton.addEventListener('click', closeImagePopup);
openAdd.addEventListener('click', openAddButton);
closeEditForm.addEventListener('click', closeAddButton);
openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);
popupForm.addEventListener('submit', addCard);