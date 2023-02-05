const openEdit = document.querySelector('.profile__info-edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__container-close-icon');
const nameInput = document.querySelector('.popup__container-name');
const jobInput = document.querySelector('.popup__container-text');
const nameValue = document.querySelector('.profile__info-title');
const jobValue = document.querySelector('.profile__info-subtitle');

function openEditClick() {
    popup.classList.add('popup_opened');
}

function closeEditClick() {
    popup.classList.remove('popup_opened');
}

function transferText() {
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
    openEditClick();
}

const formElement = document.querySelector('.popup__container-button-save');

function handleFormSubmit(event) {
    event.preventDefault();
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
    closeEditClick();
}

openEdit.addEventListener('click', openEditClick);
openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);
