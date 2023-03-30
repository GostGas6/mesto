import { elementTemplateOptions as options, popupImage, imagePopup, imagePopupHeading } from './constants.js';

class Card {
    constructor(element, templateSelector, openPopup) {
        this._name = element.name;
        this._link = element.link;
        this._templateSelector = templateSelector;
        this._openPopup = openPopup;
    };

    _openPopupImg = () => {
        imagePopup.setAttribute('src', this._link);
        imagePopup.setAttribute('alt', this._name);
        imagePopupHeading.textContent = this._name;

        this._openPopup(popupImage);
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);


        return cardElement;
    };

    _hundleDeleteElement = () => {
        this._elementItem.remove();
    };

    _toggleLike = (event) => {
        const eventTarget = event.target;
        eventTarget.classList.toggle(options.likeBtnClass);
    };

    generateCard() {
        this._elementItem = this._getTemplate();
        const delButton = this._elementItem.querySelector(options.deleteBtnSelector);
        const likeButton = this._elementItem.querySelector(options.likeBtnSelector);
        const image = this._elementItem.querySelector(options.imgSelector);

        this._elementItem.querySelector(options.elementTextSelector).textContent = this._name;
        image.src = this._link;
        image.alt = this._name;

        delButton.addEventListener('click', this._hundleDeleteElement);

        likeButton.addEventListener('click', this._toggleLike);

        image.addEventListener('click', this._openPopupImg);

        return this._elementItem;
    };

}

export default Card;