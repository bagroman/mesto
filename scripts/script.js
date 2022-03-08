import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
export const zoomPopup = document.querySelector('.zoom-popup');

const editPopupButton = document.querySelector('.profile__edit');
const addPopupButton = document.querySelector('.profile__add');
const closeEditPopupButton = document.querySelector('.close-edit');
const closeAddPopupButton = document.querySelector('.close-add');
const closeZoom = document.querySelector('.close-zoom');

const popupCardImage = document.querySelector('.popup__card-img');
const popupCardCaption = document.querySelector('.popup__card-caption');

const profileName = document.querySelector('.profile__user-name');
const profileHobby = document.querySelector('.profile__hobby');

const popupName = document.querySelector('#popup-name-field');
const popupHobby = document.querySelector('#popup-hobby-field');
const popupPlace = document.querySelector('#popup-place-field');
const popupLink = document.querySelector('#popup-link-field');

const editForm = document.querySelector('#edit-popup-form');
const addForm = document.querySelector('#add-popup-form');

const inputListForEditForm = Array.from(editForm.querySelectorAll('.popup__field'));
const buttonElementForEditForm = editForm.querySelector('.popup__button');
const inputListForAddForm = Array.from(addForm.querySelectorAll('.popup__field'));
const buttonElementForAddForm = addForm.querySelector('.popup__button');

const formValidatorEditPopup = new FormValidator(formData, editForm);
formValidatorEditPopup.enableValidation();
const formValidatorAddPopup = new FormValidator(formData, addForm);
formValidatorAddPopup.enableValidation();

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

const createCard = (name, link, template) => {
  const card = new Card(name, link, template);
  const cardElement = card.generateCard();
  return cardElement;
};

const addCard = (container, card) => {
  container.prepend(card);
};

const fillEditPopup = () => {
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
};

const fillAddPopup = () => {
  popupPlace.value = "";
  popupLink.value = "";
};

export const fillZoomPopup = (name,link) => {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
};

export const showPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscKey);
};

const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscKey);
};

const editFormSubmit = evt => {
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupHobby.value;
  closePopup(editPopup);
  evt.preventDefault();
};

const addFormSubmit = evt => {
  addCard(elements, createCard(popupPlace.value, popupLink.value, '#element-template'));
  closePopup(addPopup);
  evt.preventDefault();
};

const editPopupOpen = (formData) => {
  showPopup(editPopup);
  fillEditPopup();
  formValidatorEditPopup.resetValidation();
};

const addPopupOpen = (formData) => {
  showPopup(addPopup);
  fillAddPopup();
  formValidatorAddPopup.resetValidation();
};

const closePopupEscKey = evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

editPopupButton.addEventListener('click', function() {
  editPopupOpen(formData);
});
closeEditPopupButton.addEventListener('click', function() {
  closePopup(editPopup);
});
editForm.addEventListener('submit', editFormSubmit);

addPopupButton.addEventListener('click', function() {
  addPopupOpen(formData);
});
closeAddPopupButton.addEventListener('click', function() {
  closePopup(addPopup);
});
addForm.addEventListener('submit', addFormSubmit);

closeZoom.addEventListener('click', function() {
  closePopup(zoomPopup);
});

popups.forEach(function(popup){
  popup.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});

initialCards.forEach(item => {
  addCard(elements, createCard(item.name, item.link, "#element-template"));
})