

function showError(errorElement, inputElement, options) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(options.errorClass);
    inputElement.classList.add(options.inputErrorClass);
};

function hideError(errorElement, inputElement, options) {
    errorElement.textContent = '';
    errorElement.classList.remove(options.errorClass);
    inputElement.classList.remove(options.inputErrorClass);
};

function setButtonActive(submitElement, inactiveButtonClass) {
    submitElement.removeAttribute('disabled');
    submitElement.classList.remove(inactiveButtonClass);
};

function setButtonInactive(submitElement, inactiveButtonClass) {
    submitElement.setAttribute('disabled', 'true');
    submitElement.classList.add(inactiveButtonClass);
};

function setInputState(inputElement, isValid, options) {
    const inputSectionElement = inputElement.closest(options.errorClosestParent)
    const errorElement = inputSectionElement.querySelector(options.errorText)
    if (isValid) {
        hideError(errorElement, inputElement, options)
    } else {
        showError(errorElement, inputElement, options);
    };
}

const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    setInputState(inputElement, isValid, options)
};

const setEventListeners = (form, options) => {
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

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    errorText,
    errorClosestParent
}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        setEventListeners(form, {
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
            errorText,
            errorClosestParent
        });
    });
};
enableValidation(validationOptions);