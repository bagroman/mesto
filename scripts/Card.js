import {fillZoomPopup, showPopup, zoomPopup} from './script.js';

export default class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = this._link;
        elementPhoto.alt = this._name;
        this._element.querySelector('.element__object-name').textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', evt => {
            evt.target.classList.toggle('element__like-button_active')
        });
        this._element.querySelector('.element__trash-icon').addEventListener('click', evt => {
            evt.target.parentNode.remove()
        });
        this._element.querySelector('.element__photo').addEventListener('click', evt => {
            fillZoomPopup(evt.target.closest('.element').querySelector('.element__object-name').textContent, evt.target.src)
        });
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            showPopup(zoomPopup)
        });
    }
}