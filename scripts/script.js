const popup = document.querySelector('.popup');
const popupHeader = document.querySelector('.popup__header');

const editPopupButton = document.querySelector('.profile__edit-icon');
const addPopupButton = document.querySelector('.profile__add');
const closePopupButton = document.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__user-name');
const profileHobby = document.querySelector('.profile__hobby');

const popupName = document.querySelector('#popup-name-field');
const popupHobby = document.querySelector('#popup-hobby-or-link-field');

const formElement = document.querySelector('.popup__form');

const content = document.querySelector('.content');
const elements = document.querySelector('.elements');

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

function appendElement(item) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__photo').src = item.link;
  element.querySelector('.element__photo').alt = item.name;
  element.querySelector('.element__object-name').textContent = item.name;
  element.querySelector('.element__like-button').addEventListener('click', evt => {evt.target.classList.toggle('element__like-button_active')});
  element.querySelector('.element__trash-icon').addEventListener('click', evt => {evt.target.parentNode.remove()});
  elements.prepend(element);
}

function fillElements(item) {
  item.forEach(appendElement);
}

function showPopup(evt) {
  popup.classList.add('popup_opened');
  if (evt.target == editPopupButton) {
    popupHeader.textContent = 'Редактировать профиль';
    popup.querySelector('#popup-name-field').value = profileName.textContent;
    popup.querySelector('#popup-hobby-or-link-field').value = profileHobby.textContent;
  }
  else if (evt.target == addPopupButton) {
    popupHeader.textContent = 'Новое место';
    popup.querySelector('#popup-name-field').value = "";
    popup.querySelector('#popup-hobby-or-link-field').value = "";
    popup.querySelector('#popup-name-field').placeholder = 'Название';
    popup.querySelector('#popup-hobby-or-link-field').placeholder = 'Ссылка на картинку';
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (popupHeader.textContent == 'Редактировать профиль') {
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value;
  }
  else if (popupHeader.textContent == 'Новое место') {
    const element = {
      name: popupName.value,
      link: popupHobby.value
    };
    appendElement(element);
  }
  closePopup();
}

editPopupButton.addEventListener('click', showPopup);
addPopupButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
fillElements(initialCards);