import { formData, editPopupButton, addPopupButton, editForm, changeAvatarForm, addForm, editPopupInputs, changeAvatarButton } from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js'
import PopupWithForm from './components/PopupWithForm.js'
import PopupWithConfirmation from './components/PopupWithConfirmation.js'
import UserInfo from './components/UserInfo.js';
import './pages/index.css';
import { api } from './components/Api.js'

//id пользователя, выполнившего действие
let userId;

//получение данных профиля
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res);
    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  })

//получение данных о карточках
api.getInitialCards()
  .then(cardList => cardList.forEach(data => {
    cards.addItem(createCard(data, '#element-template', userId))
  }))
  .catch((err) => {
    console.log(err);
  })

//установка валидации попапов
const formValidatorEditPopup = new FormValidator(formData, editForm);
formValidatorEditPopup.enableValidation();
const formValidatorAddPopup = new FormValidator(formData, addForm);
formValidatorAddPopup.enableValidation();
const formValidationChangeAvatarPopup = new FormValidator(formData, changeAvatarForm);
formValidationChangeAvatarPopup.enableValidation();

//открытие изображения при клике на карточку
const handleCardClick = (placeName, link) => {
  popupWithImage.open(placeName, link);
};

//открытие попапа корзины
const handleDeleteClick = (id, card) => {
  popupWithFormDeleteConfirm.open();
  popupWithFormDeleteConfirm.changeSubmitHandler(() => {handleDeleteConfirm(id, card)});
}

//подтверждение удаления карточки
const handleDeleteConfirm = (id, card) => {
  api.deleteCard(id)
      .then(res => {
        card.removeItem();
        popupWithFormDeleteConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
}

//подтверждение смены аватара
const handleAvatarClick = (data) => {
  popupWithFormChangeAvatar.renderWaitingStatus(true);
  api.changeAvatar(data.src)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormChangeAvatar.renderWaitingStatus(false);
    })
}

//лайк и дизлайк карточки
const handleLikeClick = (id, card) => {
  if (card.isLiked()) {
    api.deleteLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  else {
    api.addLike(id)
    .then(res => {
      card.setLikes(res.likes)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

//создание карточки
const createCard = (dataCard, template, id) => {
  const card = new Card({ 
    data: dataCard, 
    handleCardClick, 
    handleDeleteClick,
    handleLikeClick }, 
    template,
    id);
  const cardElement = card.generateCard();
  return cardElement;
};

//подтверждение редактирования профиля
const editFormSubmit = profileData => {
  popupWithFormEdit.renderWaitingStatus(true);
  api.editProfile(profileData.name, profileData.about)
    .then(res => {
      userInfo.setUserInfo(res);
      popupWithFormEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEdit.renderWaitingStatus(false);
    })
};

//подтверждение добавления карточки
const addFormSubmit = cardData => {
  popupWithFormAdd.renderWaitingStatus(true);
  api.addCard(cardData.name, cardData.link)
    .then(res => {
      cards.addItem(createCard(res, '#element-template', userId));
      popupWithFormAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAdd.renderWaitingStatus(false);
    })
};

//добавлние слушателей на кнопки вызова попапов
editPopupButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  editPopupInputs.forEach(input => {
    input.value = userData[input.name];
  });
  formValidatorEditPopup.resetValidation();
  popupWithFormEdit.open();
});

addPopupButton.addEventListener('click', function() {
  popupWithFormAdd.open();
  formValidatorAddPopup.resetValidation();
});

changeAvatarButton.addEventListener('click', function() {
  popupWithFormChangeAvatar.open();
  formValidatorAddPopup.resetValidation();
});

//создание экзепляров классов Section, PopupWithImage, PopupWithForm, UserInfo
const cards = new Section(
  {
    items: [],
    renderer: (item, id) => {
      cards.addItem(createCard(item, '#element-template', id));
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

const popupWithFormDeleteConfirm = new PopupWithConfirmation('.delete-confirm-popup', handleDeleteClick);
popupWithFormDeleteConfirm.setEventListeners();

const popupWithFormChangeAvatar = new PopupWithForm('.change-avatar-popup', handleAvatarClick);
popupWithFormChangeAvatar.setEventListeners();

const userInfo = new UserInfo(
  {
    nameSelector: '.profile__user-name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar',
  }
);