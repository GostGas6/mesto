
export default class Card {
    constructor(element, handleCardClick, templateSelector, elementTemplateOptions) {
        this._options = elementTemplateOptions;
        this._name = element.name;
        this._link = element.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardTemplate = document.querySelector(`#${this._templateSelector}`).content;
        const elementItem = cardTemplate.querySelector(options.elementSelector).cloneNode(true);
        return elementItem;
    };

    _hundleDeleteElement = () => {
        this._elementItem.remove();
    };

    _toggleLike = () => {
        this._likeButton.classList.toggle('element_like-active');
    };

    _setEventListeners() {
        this._delButton.addEventListener('click', this._hundleDeleteElement);

        this._likeButton.addEventListener('click', this._toggleLike);

        this._image.addEventListener('click', this._handleCardClick);
    }

    generateCard() {
        this._elementItem = this._getTemplate();

        this._delButton = this._elementItem.querySelector(options.deleteBtnSelector);
        this._likeButton = this._elementItem.querySelector(options.likeBtnSelector);
        this._image = this._elementItem.querySelector(options.imgSelector);

        this._elementItem.querySelector(options.elementTextSelector).textContent = this._name;

        this._image.src = this._link;
        this._image.alt = this._name;

        this._setEventListeners()

        return this._elementItem;
    };
}
