const formData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const showInputError = (formData, inputElement, errorMessage) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formData['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formData['errorClass']);
};
  
const hideInputError = (formData, inputElement) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formData['inputErrorClass']);
    if (errorElement.classList.contains(formData['errorClass'])) {
        errorElement.classList.remove(formData['errorClass']);
    }
    errorElement.textContent = '';
};

const checkInputValidity = (formData, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formData, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formData, inputElement);
    }
};
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (formData, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formData['inactiveButtonClass']);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(formData['inactiveButtonClass']);
        buttonElement.disabled = false;
    }
};
  
const setEventListeners = (formData, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formData['inputSelector']));
    const buttonElement = formElement.querySelector(formData['submitButtonSelector']);
    toggleButtonState(formData, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formData, inputElement);
            toggleButtonState(formData, inputList, buttonElement);
        });
    });
};

const enableValidation = (formData) => {
    const formList = Array.from(document.querySelectorAll(formData['formSelector']));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
    setEventListeners(formData, formElement);
    });
};