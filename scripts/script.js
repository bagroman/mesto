let popup = document.querySelector('.popup');
let editPopupButton = document.querySelector('.profile__edit-icon');
let closePopupButton = document.querySelector('.popup__close-button');

let profileName = document.querySelector('.profile__user-name');
let profileHobby = document.querySelector('.profile__hobby');

let popupName = document.querySelector('#popup-name-field');
let popupHobby = document.querySelector('#popup-hobby-field');

let formElement = document.querySelector('.popup__form');

let elements = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function fillElements() {
    const elementTemplate = document.querySelector('#element-template').content;
    initialCards.forEach(function(item){
        const element = elementTemplate.querySelector('.element').cloneNode(true);
        element.querySelector('.element__photo').src = item.link;
        element.querySelector('.element__photo').alt = item.name;
        element.querySelector('.element__object-name').textContent = item.name;
        elements.append(element);
    })
}

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
fillElements();