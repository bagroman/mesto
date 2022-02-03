const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const zoomPopup = document.querySelector('.zoom-popup');

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

const createCard = (name, link) => {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = link;
  elementPhoto.alt = name;
  element.querySelector('.element__object-name').textContent = name;
  element.querySelector('.element__like-button').addEventListener('click', evt => {evt.target.classList.toggle('element__like-button_active')});
  element.querySelector('.element__trash-icon').addEventListener('click', evt => {evt.target.parentNode.remove()});
  elementPhoto.addEventListener('click', evt => {fillZoomPopup(evt.target.closest('.element').querySelector('.element__object-name').textContent, evt.target.src)});
  elementPhoto.addEventListener('click', function(){showPopup(zoomPopup)});
  return element;
};

const addCard = (container, cardElement) => container.prepend(cardElement);

const fillEditPopup = () => {
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
};

const fillAddPopup = () => {
  popupPlace.value = "";
  popupLink.value = "";
};

const fillZoomPopup = (name,link) => {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
};

const showPopup = popup => {
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
  addCard(elements, createCard(popupPlace.value, popupLink.value));
  closePopup(addPopup);
  evt.preventDefault();
};

const editPopupOpen = () => {
  showPopup(editPopup);
  fillEditPopup();
  enableValidation(formData);
};

const addPopupOpen = () => {
  showPopup(addPopup);
  fillAddPopup();
  enableValidation(formData);
};

const closePopupEscKey = evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

editPopupButton.addEventListener('click', editPopupOpen);
closeEditPopupButton.addEventListener('click', function(){closePopup(editPopup)});
editForm.addEventListener('submit', editFormSubmit);

addPopupButton.addEventListener('click', addPopupOpen);
closeAddPopupButton.addEventListener('click', function(){closePopup(addPopup)});
addForm.addEventListener('submit', addFormSubmit);

closeZoom.addEventListener('click', function(){closePopup(zoomPopup)});

popups.forEach(function(popup){
  popup.addEventListener('click', function(evt){
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});

initialCards.forEach(card => {addCard(elements, createCard(card.name, card.link))});