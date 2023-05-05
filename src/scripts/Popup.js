export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
    };

    _handleKey = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        };
    };

    _handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.closePopup();
        };
    };

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleKey);
    };

    closePopup = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleKey);
    };

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            this.closePopup();
        });

        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        });

        document.addEventListener('keydown', (evt) => {
            this._handleKey(evt);
        });
    }
};