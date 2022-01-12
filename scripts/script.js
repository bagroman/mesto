let popup = document.querySelector('.popup');
let editPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__username');
let profileHobby = document.querySelector('.profile__hobby');

let popupName = document.querySelector('.popup__name');
let popupHobby = document.querySelector('.popup__hobby');

let formElement = document.querySelector('.popup__form');

function showPopup() {
    popup.classList.add('popup__open');
    popupName.value = profileName.textContent;
    popupHobby.value = profileHobby.textContent;
}

function closePopup() {
    popup.classList.remove('popup__open');
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