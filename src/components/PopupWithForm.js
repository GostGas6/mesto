import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = document.querySelector('.popup__form');
        this._inputsList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._inputsValues = {};
        this._buttonSubmit = this._popup.querySelector('.popup__button-save');
        this._buttonSubmitText = this._buttonSubmit.value;
    }

    _getInputValues() {
        this._inputsList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });

        return this._inputsValues
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    };

    renderLoading(isLoading, loadingText) {
        if (!this._buttonSubmit) return;
        if (isLoading) {
            this._buttonSubmit.value = loadingText;
        } else {
            this._buttonSubmit.value = this._buttonSubmitText
        }
    };

    close() {
        super.close();
        this._form.reset();
    };

    fillInputs(userData) {
        this._inputsList.forEach((input) => {
            input.value = userData[input.name] ?? '';
        });
    }
}