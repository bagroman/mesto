const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const zoom = document.querySelector('.zoom');

const editPopupButton = document.querySelector('.profile__edit');
const addPopupButton = document.querySelector('.profile__add');
const closeEditPopupButton = document.querySelector('.close_edit');
const closeAddPopupButton = document.querySelector('.close_add');
const closeZoom = document.querySelector('.close_zoom');

const profileName = document.querySelector('.profile__user-name');
const profileHobby = document.querySelector('.profile__hobby');

const popupName = document.querySelector('#popup-name-field');
const popupHobby = document.querySelector('#popup-hobby-field');
const popupPlace = document.querySelector('#popup-place-field');
const popupLink = document.querySelector('#popup-link-field');

const editForm = document.querySelector('#edit-popup-form');
const addForm = document.querySelector('#add-popup-form');

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

function createCard(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__photo').src = link;
  element.querySelector('.element__photo').alt = name;
  element.querySelector('.element__object-name').textContent = name;
  element.querySelector('.element__like-button').addEventListener('click', evt => {evt.target.classList.toggle('element__like-button_active')});
  element.querySelector('.element__trash-icon').addEventListener('click', evt => {evt.target.parentNode.remove()});
  element.querySelector('.element__photo').addEventListener('click', fillZoomPopup);
  element.querySelector('.element__photo').addEventListener('click', function(){showPopup(zoom)});
  return element;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function fillEditPopup() {
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
}

function fillAddPopup() {
  popupPlace.value = "";
  popupLink.value = "";
}

function fillZoomPopup(evt) {
  zoom.querySelector('.zoom__img').src = evt.target.src;
  zoom.querySelector('.zoom__img').alt = evt.target.closest('.element').querySelector('.element__object-name').textContent;
  zoom.querySelector('.zoom__caption').textContent = evt.target.closest('.element').querySelector('.element__object-name').textContent;
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function editFormSubmit(evt) {
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupHobby.value;
  closePopup(editPopup);
  evt.preventDefault();
}

function addFormSubmit(evt) {
  addCard(elements, createCard(popupPlace.value, popupLink.value));
  closePopup(addPopup);
  evt.preventDefault();
}

editPopupButton.addEventListener('click', function(){showPopup(editPopup)});
editPopupButton.addEventListener('click', fillEditPopup);
closeEditPopupButton.addEventListener('click', function(){closePopup(editPopup)});
editForm.addEventListener('submit', editFormSubmit);

addPopupButton.addEventListener('click', function(){showPopup(addPopup)});
addPopupButton.addEventListener('click', fillAddPopup);
closeAddPopupButton.addEventListener('click', function(){closePopup(addPopup)});
addForm.addEventListener('submit', addFormSubmit);

closeZoom.addEventListener('click', function(){closePopup(zoom)});

initialCards.forEach(card => {addCard(elements, createCard(card.name, card.link))});