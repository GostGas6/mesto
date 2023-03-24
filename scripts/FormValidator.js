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
    const submitElement = form.querySelector(options.submitButtonSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));

    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            toggleInputState(inputElement, options);
            toggleBtnState(inputs, submitElement, options.inactiveButtonClass);
        });
    })


    const toggleBtnState = (inputs, submitElement, inactiveButtonClass) => {
        const isFormValid = inputs.every((inputElement) => {
            return inputElement.validity.valid;
        });

        if (isFormValid) {
            setButtonActive(submitElement, inactiveButtonClass);
        } else {
            setButtonInactive(submitElement, inactiveButtonClass);
        }
    }

    toggleBtnState(inputs, submitElement)
}
}