import { elementTemplateOptions as options } from '../utils/constants.js';

export default class Card {
    constructor(element, templateSelector, { userId, handleCardClick, handleLikeCard, confirmDelete }) {
        this._name = element.name;
        this._link = element.link;
        this._ownerId = element.owner._id;
        this.cardId = element._id;
        this.likes = element.likes;
        this.likesCounter = (element.likes).length;
        this._userId = userId;

        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._confirmDelete = confirmDelete;
        this._handleLikeCard = handleLikeCard;
    };

    _getTemplate() {
        const cardTemplate = document.querySelector(`#${this._templateSelector}`).content;
        const elementItem = cardTemplate.querySelector(options.elementSelector).cloneNode(true);
        return elementItem;
    };

    _hundleDeleteElement = () => {
        this._elementItem.remove();
    };

    isLiked(likes) {
        return likes.some(like => {
            return like._id === this._userId;
        })
    };

    like = ({ likes }) => {
        console.log(likes.length)
        this._likeButton.classList.toggle(options.likeBtnClass);
        this._counterSelector.textContent = this.likes.length;
    };

    deleteCard(card) {
        this._elementItem.remove(card);
        this._elementItem = null;
    }


    _toggleLike = () => {
        this._likeButton.classList.toggle('element_like-active');
        this._counter.textContent = this.likes.length;
    };

    _setEventListeners() {
        this._delButton.addEventListener('click', () => {
            this._confirmDelete()
        });

        this._likeButton.addEventListener('click', this._toggleLike);

        this._image.addEventListener('click', this._handleCardClick);
    }

    generateCard() {
        this._elementItem = this._getTemplate();

        this._delButton = this._elementItem.querySelector(options.deleteBtnSelector);
        this._likeButton = this._elementItem.querySelector(options.likeBtnSelector);
        this._image = this._elementItem.querySelector(options.imgSelector);
        this._counter = this._elementItem.querySelector(options.counterSelector);

        this._elementItem.querySelector(options.elementTextSelector).textContent = this._name;

        this._image.src = this._link;
        this._image.alt = this._name;
        this._counter.textContent = this.likesCounter.like;

        if (this._ownerId !== this._userId) {
            this._delButton.remove()
        }

        if (this.isLiked(this.likes)) {
            this._likeButton.classList.add('element_like-active')
        }

        this._setEventListeners()

        return this._elementItem;
    };
}
