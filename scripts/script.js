let popup = document.querySelector('.popup');
let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__user-name');
let profileHobby = document.querySelector('.profile__hobby');

let popupName = document.querySelector('#popup-name-field');
let popupHobby = document.querySelector('#popup-hobby-field');

let formElement = document.querySelector('.popup__form');

function showPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupHobby.value = profileHobby.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value;
    closePopup();
}

editPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);