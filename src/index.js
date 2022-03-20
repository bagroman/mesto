import { formData, initialCards, editPopup, editPopupButton, addPopupButton, editForm, addForm } from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js'
import PopupWithForm from './components/PopupWithForm.js'
import UserInfo from './components/UserInfo.js';
import './pages/index.css';

const formValidatorEditPopup = new FormValidator(formData, editForm);
formValidatorEditPopup.enableValidation();
const formValidatorAddPopup = new FormValidator(formData, addForm);
formValidatorAddPopup.enableValidation();

const handleCardClick = (placeName, link) => {
  popupWithImage.open(placeName, link);
};

const createCard = (dataCard, template) => {
  const card = new Card({ data: dataCard, handleCardClick }, template);
  const cardElement = card.generateCard();
  return cardElement;
};

const editFormSubmit = profileData => {
  userInfo.setUserInfo(profileData);
  popupWithFormEdit.close();
};

const addFormSubmit = cardData => {
  cards.addItem(createCard(cardData, '#element-template'));
  popupWithFormAdd.close();
};

editPopupButton.addEventListener('click', function() {
  popupWithFormEdit.open();
  const userData = userInfo.getUserInfo();
  editPopup.querySelectorAll('.popup__field').forEach(input => {
    input.value = userData[input.name];
  });
  formValidatorEditPopup.resetValidation();
});

addPopupButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  formValidatorAddPopup.resetValidation();
});

const cards = new Section(
  {
    items: initialCards,
    renderer: item => {
      cards.addItem(createCard(item, '#element-template'));
    }
  },
  '.elements'
);
cards.renderItems();

const popupWithImage = new PopupWithImage('.zoom-popup');
popupWithImage.setEventListeners();

const popupWithFormEdit = new PopupWithForm('.edit-popup', editFormSubmit);
popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.add-popup', addFormSubmit);
popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo(
  {
    nameSelector: '.profile__user-name',
    hobbySelector: '.profile__hobby'
  }
);