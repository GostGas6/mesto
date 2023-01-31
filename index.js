let openEdit = document.querySelector('.profile__info_edit-button');
let popup = document.querySelector('.popup');
let closeEdit = document.querySelector('.popup__container_close-icon');

function openEditClick() {
    popup.classList.add('popup_opened');
}

openEdit.addEventListener('click', openEditClick);

function closeEditClick() {
    popup.classList.remove('popup_opened');
}

closeEdit.addEventListener('click', closeEditClick);