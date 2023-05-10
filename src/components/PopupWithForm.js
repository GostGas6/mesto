import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._inputsValues = {};
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