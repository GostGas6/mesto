class FormValidator {
    constructor(validationOptions, form, submitElement) {
        this._form = form;
        this._options = validationOptions;
        this._submitElement = submitElement;
    };
    _showError(errorElement, inputElement, options) {
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._options.errorClass);
        inputElement.classList.add(this._options.inputErrorClass);
    };

    _hideError(errorElement, inputElement, options) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.errorClass);
        inputElement.classList.remove(this._options.inputErrorClass);
    };

    _setButtonActive(submitElement, inactiveButtonClass) {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._options.inactiveButtonClass);
    };

    _setButtonInactive(submitElement, inactiveButtonClass) {
        submitElement.setAttribute('disabled', 'true');
        submitElement.classList.add(this._options.inactiveButtonClass);
    };

    _setInputState(inputElement, isValid) {
        const inputSectionElement = inputElement.closest(this._options.errorClosestParent);
        const errorElement = inputSectionElement.querySelector(this._options.errorText);
        if (isValid) {
            this._hideError(errorElement, inputElement);
        } else {
            this._showError(errorElement, inputElement);
        };
    }

    _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        this._setInputState(inputElement, isValid);
    };

    _setEventListeners = (form) => {
        const inputs = Array.from(form.querySelectorAll(this._options.inputSelector));

        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleBtnState(inputs);
            });
        })


        const toggleBtnState = (inputs) => {
            const isFormValid = inputs.every((inputElement) => {
                return inputElement.validity.valid;
            });

            if (isFormValid) {
                this._setButtonActive();
            } else {
                this._setButtonInactive();
            }
        }

        toggleBtnState(inputs)
    };
    enableValidation() {
        const form = this._form;
        this._setEventListeners(form);
    };
}


export default FormValidator;