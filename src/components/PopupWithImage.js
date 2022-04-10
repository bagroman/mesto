import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCaption = this._popup.querySelector('.popup__card-caption');
        this._popupLink = this._popup.querySelector('.popup__card-img');
    }

    //открытие изображения
    open(placeName, link) {
        this._popupLink.src = link;
        this._popupLink.alt = placeName;
        this._popupCaption.textContent = placeName;
        super.open();
    }
}