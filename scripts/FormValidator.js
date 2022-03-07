export default class FormValidator {
    constructor(formData, activeForm) {
        this._formSelector = formData.formSelector;
        this._inputSelector = formData.inputSelector;
        this._submitButtonSelector = formData.submitButtonSelector;
        this._inactiveButtonClass = formData.inactiveButtonClass;
        this._inputErrorClass = formData.inputErrorClass;
        this._errorClass = formData.errorClass;
        this._activeForm = activeForm;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._activeForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._activeForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        if (errorElement.classList.contains(this._errorClass)) {
            errorElement.classList.remove(this._errorClass);
        }
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList) {
        const buttonElement = this._activeForm.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
        else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._toggleButtonState(inputList);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
            });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', evt => {
                evt.preventDefault();
            });
        this._setEventListeners(formElement);
        });
    }
}