export default class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._element.querySelector('.element__object-name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', evt => {
            evt.target.classList.toggle('element__like-button_active');
        });
        this._element.querySelector('.element__trash-icon').addEventListener('click', evt => {
            evt.target.parentNode.remove();
        });
        this._elementPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}