export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector, userId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    //получение данных карточки из шаблона
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    //генерация карточки
    generateCard() {
        this._element = this._getTemplate();
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._countLikeElement = this._element.querySelector('.element__like-button-count');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._element.querySelector('.element__object-name').textContent = this._name;
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.element__trash-icon').style.display = 'none';
        }
        this.setLikes(this._likes);
        this._setEventListeners();
        return this._element;
    }

    //удаление карточки из DOM
    removeItem() {
        this._element.remove();
        this._element = null;
    }

    //проверка лайка от текущего пользователя
    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        return userHasLikedCard;
    }
    
    //простановка лайков на карточку
    setLikes(newLikes) {
        this._likes = newLikes;      
        this._countLikeElement.textContent = this._likes.length;
        if (this.isLiked()) {
            this._likeButton.classList.add('element__like-button_active');
        }
        else {
            this._likeButton.classList.remove('element__like-button_active');
        }
    }

    //установка слушателей на карточку
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id, this);
        });
        this._element.querySelector('.element__trash-icon').addEventListener('click', () => {
            this._handleDeleteClick(this._id, this);
        });
        this._elementPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}