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
const profilePopup = document.querySelector('#popup_edit');
const cardPopup = document.querySelector('#popup-add');
const closeButton = document.querySelectorAll('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const aboutInput = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.popup__form');
const openAdd = document.querySelector('.profile__add-button');
const titleForm = cardPopup.querySelector('#popup_place');
const linkForm = cardPopup.querySelector('#popup_link');
const cardTemplate = document.querySelector('#element_template').content;
const popupImage = document.querySelector('#popup_image');
const imagePopup = popupImage.querySelector('.popup-image__image');
const imagePopupHeading = popupImage.querySelector('.popup-image__text');
const imageButton = document.querySelector('#image-element');


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
    closePopup(cardPopup);
};

//функция кнопки лайка
function toggleLike(event) {
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

    likeButton.addEventListener('click', toggleLike);

    image.addEventListener('click', openPopupImg);


    return elementItem;
};

const openPopupImg = (event) => {
    const imageLink = event.target.getAttribute('src');
    const imageHeading = event.target.closest('.element').querySelector('#element-name').textContent;

    imagePopup.setAttribute('src', imageLink);
    imagePopup.setAttribute('alt', imageHeading);
    imagePopupHeading.textContent = imageHeading;

    openPopup(popupImage);
};

//функция добавление карт из "коробки"
initialCards.forEach(renderCard);

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


closeButton.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

openAdd.addEventListener('click', function () {
    openPopup(cardPopup);
});

//функция редактирования и закрытия popup профиля
function handleFormSubmitEdit(evt) {
    evt.preventDefault(evt);
    const userNameNew = nameInput.value;
    const userJobNew = aboutInput.value;
    
    nameValue.textContent = userNameNew;
    jobValue.textContent = userJobNew;
  
    closePopup(profilePopup);
  };
  

openEdit.addEventListener('click', () => {

    nameInput.value = nameValue.textContent;
    aboutInput.value = jobValue.textContent;

    openPopup(profilePopup);
});

profilePopup.addEventListener('submit', handleFormSubmitEdit);

cardPopup.addEventListener('submit', addCard);