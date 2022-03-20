import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmit) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._popupForm = this._popup.querySelector(".popup__form");
        this._inputList = this._popupForm.querySelectorAll(".popup__field");
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    _getInputValues() {
        this._inputValues = {}
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => {
            evt.preventDefault();
            this._callbackSubmit(this._getInputValues());
        });
    }
}