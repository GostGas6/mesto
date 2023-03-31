
export default class FormValidator {
    constructor(validationOptions, submitElement) {
        this._inputSelector = validationOptions.inputSelector;
        this._submitButtonSelector = validationOptions.submitButtonSelector;
        this._inactiveButtonClass = validationOptions.inactiveButtonClass;
        this._inputErrorClass = validationOptions.inputErrorClass;
        this._errorClass = validationOptions.errorClass;
        this._errorText = validationOptions.errorText;
        this._errorClosestParent = validationOptions.errorClosestParent;

        this._options = validationOptions;
        this._submitElement = submitElement;
        this._inputs = Array.from(this._submitElement.querySelectorAll(this._options.inputSelector));
        this._buttonElement = this._submitElement.querySelector(this._submitButtonSelector);
    };

    _showError(inputElement) {
        const errorElement = this._submitElement.querySelector(
            `.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._options.errorClass);
        inputElement.classList.add(this._options.inputErrorClass);
    };

    _hideError(inputElement) {
        const errorElement = this._submitElement.querySelector(
            `.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.errorClass);
        inputElement.classList.remove(this._options.inputErrorClass);
    };

    _setButtonActive() {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._options.inactiveButtonClass);
    };

    _setButtonInactive() {
        this._submitElement.setAttribute('disabled', 'true');
        this._submitElement.classList.add(this._options.inactiveButtonClass);
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }


    // _setInputState(inputElement, isValid) {
    //     const inputSectionElement = inputElement.closest(this._options.errorClosestParent);
    //     const errorElement = inputSectionElement.querySelector(this._options.errorText);
    //     if (isValid) {
    //         this._hideError(errorElement, inputElement);
    //     } else {
    //         this._showError(errorElement, inputElement);
    //     };
    // }

    // _toggleInputState = (inputElement) => {
    //     const isValid = inputElement.validity.valid;
    //     this._setInputState(inputElement, isValid);
    // };

    _toggleBtnState = (inputs) => {
        const isFormValid = inputs.every((inputElement) => {
            return inputElement.validity.valid;
        });

        if (isFormValid) {
            this._setButtonActive();
        } else {
            this._setButtonInactive();
        }
    }

    _setEventListeners = (form) => {

        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._hasInvalidInput(inputElement);
                this._toggleBtnState();
            });
        });
        this._submitElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    };

    resetValidation() {
        this._toggleBtnState();
        this._inputs.forEach((inputElement) => {
            this._hideError(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
    };
}
