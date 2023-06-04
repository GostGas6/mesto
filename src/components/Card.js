// import { elementTemplateOptions as options } from '../utils/constants.js';

export default class Card {
    constructor(element, templateSelector, options, { userId, handleCardClick, handleLikeCard, confirmDelete }) {
        this._name = element.name;
        this._link = element.link;
        this._ownerId = element.owner._id;
        this.cardId = element._id;
        this.likes = element.likes;
        this.likesCounter = element.likes.length;
        this._userId = userId;
        this._options = options
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._confirmDelete = confirmDelete;
        this._handleLikeCard = handleLikeCard;
        this._elementItem = this._getTemplate();
        this._counter = this._elementItem.querySelector(this._options.counterSelector);
    };

    _getTemplate() {
        const cardTemplate = document.querySelector(`#${this._templateSelector}`).content;
        const elementItem = cardTemplate.querySelector(this._options.elementSelector).cloneNode(true);
        return elementItem;
    };

    _hundleDeleteElement = () => {
        this._elementItem.remove();
    };

    isLiked(likes) {
        return likes.some(user => {
            user._id === this._userId;
        })
    };

    like = ({ likes }) => {
        console.log('тык', this._counter, likes)
        this._counter.textContent = likes.length;

        if (this._elementItem.likeButton.classList.contains(elementTemplateOptions.likeBtnClass)) {
            this.handleDisikeCard(this._element.cardId);
        } else {
            this.handleLikeCard(this._element.cardId);
        }

        // if (!likes.length) {
        //     this._likeButton.classList.remove(this._options.likeBtnClass)
        // } else {
        //     likes.forEach((user) => {
        //         if (user._id === this._ownerId) {
        //             this._likeButton.classList.add(this._options.likeBtnClass)
        //             return
        //         }
        //         this._likeButton.classList.remove(this._options.likeBtnClass)
        //     })
        // }

    };

    deleteCard() {
        this._elementItem.remove();
        this._elementItem = null;
    }

    addLike() {
        this._elementItem.likeButton
            .classList.add(elementTemplateOptions.likeBtnClass);
    }

    removeLike() {
        this._elementItem.likeButton
            .classList.remove(elementTemplateOptions.likeBtnClass);
    }

    updateLikeButton({ likes }) {
        this._elementItem.counter.textContent = likes.length
        if (!likes.length) {
            this._removeLike()
        } else {
            likes.forEach((user) => {
                if (user._id === this._userID) {
                    this._addLike()
                    return
                }
                this._removeLike()
            })
        }
    };

    _toggleLike = () => {
        this._likeButton.classList.toggle('element_like-active');
        this._counter.textContent = this.likes.length;

        this._handleLikeCard(this.cardId, this.isLiked)
    };

    _setEventListeners() {
        this._delButton.addEventListener('click', () => {
            this._confirmDelete()
        });

        this._likeButton.addEventListener('click', this._toggleLike);

        this._image.addEventListener('click', this._handleCardClick);
    }

    generateCard() {
        // this._elementItem = this._getTemplate();

        this._delButton = this._elementItem.querySelector(this._options.deleteBtnSelector);
        this._likeButton = this._elementItem.querySelector(this._options.likeBtnSelector);
        this._image = this._elementItem.querySelector(this._options.imgSelector);
        // this._counter = this._elementItem.querySelector(this._options.counterSelector);

        this._elementItem.querySelector(this._options.elementTextSelector).textContent = this._name;

        this._image.src = this._link;
        this._image.alt = this._name;
        this._counter.textContent = this.likesCounter;

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
