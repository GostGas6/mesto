const openEdit = document.querySelector('.profile__info_edit-button');
const popup = document.querySelector('.popup');
const closeEdit = document.querySelector('.popup__container_close-icon');
const formElement = document.querySelector('.popup__container_button-save');
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

function handleFormSubmit(event) {
    event.preventDefault();
    nameValue.textContent = nameInput.value;
    jobValue.textContent = nameInput.value;
    closeEditClick();
}

openEdit.addEventListener('click', openEditClick);
openEdit.addEventListener('click', transferText);
closeEdit.addEventListener('click', closeEditClick);
formElement.addEventListener('submit', handleFormSubmit);
