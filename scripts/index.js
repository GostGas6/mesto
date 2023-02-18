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


function closeEditClick() {
    popup.classList.remove('popup_opened');
}

function transferText() {
    nameInput.value = nameValue.textContent;
    aboutInput.value = jobValue.textContent;
    popup.classList.add('popup_opened');
}

function handleFormSubmit(event) {
    event.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = aboutInput.value;
    closeEditClick();
}

function openAddButton () {
    popupForm.classList.add('popup-form_opened');
}

function closeAddButton () {
    popupForm.classList.remove('popup-form_opened');
}


openAdd.addEventListener('click', openAddButton);
closeEditForm.addEventListener('click', closeAddButton);
openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);