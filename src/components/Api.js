class Api {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }

    //получение данных профиля
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //получение данных о карточках
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }
  
    //редактирование профиля
    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //добавление карточки
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //удаление лайка
    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //добавление лайка
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //смена аватара
    changeAvatar(src) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: src
            })
        }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }
  }
  
  //создание экземпляра класса
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: 'c405f26d-01c5-4625-b732-055d41cc2cd5',
      'Content-Type': 'application/json'
    }
  });