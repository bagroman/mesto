const editPopup = document.querySelector('.edit-popup');
const addPopup = document.querySelector('.add-popup');
const zoom = document.querySelector('.zoom');

const editPopupButton = document.querySelector('.profile__edit');
const addPopupButton = document.querySelector('.profile__add');
const closeEditPopupButton = document.querySelector('.close-edit');
const closeAddPopupButton = document.querySelector('.close-add');
const closeZoom = document.querySelector('.close-zoom');

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
  element.querySelector('.element__photo').src = link;
  element.querySelector('.element__photo').alt = name;
  element.querySelector('.element__object-name').textContent = name;
  element.querySelector('.element__like-button').addEventListener('click', evt => {evt.target.classList.toggle('element__like-button_active')});
  element.querySelector('.element__trash-icon').addEventListener('click', evt => {evt.target.parentNode.remove()});
  element.querySelector('.element__photo').addEventListener('click', fillZoomPopup);
  element.querySelector('.element__photo').addEventListener('click', function(){showPopup(zoom)});
  return element;
}

const addCard = (container, cardElement) => container.prepend(cardElement);

const fillEditPopup = () => {
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
}

const fillAddPopup = () => {
  popupPlace.value = "";
  popupLink.value = "";
}

const fillZoomPopup = evt => {
  zoom.querySelector('.zoom__img').src = evt.target.src;
  zoom.querySelector('.zoom__img').alt = evt.target.closest('.element').querySelector('.element__object-name').textContent;
  zoom.querySelector('.zoom__caption').textContent = evt.target.closest('.element').querySelector('.element__object-name').textContent;
}

const showPopup = popup => popup.classList.add('popup_opened');

const closePopup = popup => popup.classList.remove('popup_opened');

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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  if (errorElement.classList.contains('popup__field-error_active')) {
    errorElement.classList.remove('popup__field-error_active');
  }
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-inactive');
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove('popup__button-inactive');
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const editPopupOpen = () => {
  showPopup(editPopup);
  fillEditPopup();
  enableValidation();
}

editPopupButton.addEventListener('click', editPopupOpen);
closeEditPopupButton.addEventListener('click', function(){closePopup(editPopup)});
editForm.addEventListener('submit', editFormSubmit);

addPopupButton.addEventListener('click', function(){showPopup(addPopup)});
addPopupButton.addEventListener('click', fillAddPopup);
closeAddPopupButton.addEventListener('click', function(){closePopup(addPopup)});
addForm.addEventListener('submit', addFormSubmit);

closeZoom.addEventListener('click', function(){closePopup(zoom)});

initialCards.forEach(card => {addCard(elements, createCard(card.name, card.link))});