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
        const cardTemplate = document.getElementById(this._templateSelector).content;
        const elementItem = cardTemplate.querySelector(options.elementSelector).cloneNode(true);
        return elementItem;
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

        this._delButton = this._elementItem.querySelector(options.deleteBtnSelector);
        this._likeButton = this._elementItem.querySelector(options.likeBtnSelector);
        this._image = this._elementItem.querySelector(options.imgSelector);

        this._elementItem.querySelector(options.elementTextSelector).textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        this._delButton.addEventListener('click', this._hundleDeleteElement);

        this._likeButton.addEventListener('click', this._toggleLike);

        this._image.addEventListener('click', this._openPopupImg);

        return this._elementItem;
    };
};

export default Card;