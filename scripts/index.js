const openEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('#popup_name');
const aboutInput = document.querySelector('#popup_about')
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.userData');

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

openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);