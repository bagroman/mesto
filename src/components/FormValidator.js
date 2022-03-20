export default class FormValidator {
    constructor(formData, activeForm) {
        this._formSelector = formData.formSelector;
        this._inputSelector = formData.inputSelector;
        this._submitButtonSelector = formData.submitButtonSelector;
        this._inactiveButtonClass = formData.inactiveButtonClass;
        this._inputErrorClass = formData.inputErrorClass;
        this._errorClass = formData.errorClass;
        this._activeForm = activeForm;
        this._inputList = Array.from(this._activeForm.querySelectorAll(this._inputSelector));
        this._buttonElement = this._activeForm.querySelector(this._submitButtonSelector);
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

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._activeForm.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        this._setEventListeners(this._activeForm);
    }
}