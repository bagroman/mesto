import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, callbackSubmit) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._popupForm = this._popup.querySelector(".popup__form");
    }

    //заменяем стандартный callback
    changeSubmitHandler(newSubmitHandler) {
        this._callbackSubmit = newSubmitHandler;
    }

    //установка слушателей на форму
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", evt => {
            evt.preventDefault();
            this._callbackSubmit();
        });
    }
}