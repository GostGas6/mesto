const openEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__text');
const nameValue = document.querySelector('.profile__title');
const jobValue = document.querySelector('.profile__subtitle');

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

const formElement = document.querySelector('.popup__button-save');

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
