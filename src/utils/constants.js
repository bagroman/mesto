export {formData, editPopup, editPopupButton, addPopupButton, editForm, addForm, editPopupInputs, changeAvatarButton, changeAvatarForm};

const formData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const editPopup = document.querySelector('.edit-popup');
const editPopupInputs = editPopup.querySelectorAll('.popup__field');

const editPopupButton = document.querySelector('.profile__edit');
const addPopupButton = document.querySelector('.profile__add');

const editForm = document.querySelector('#edit-popup-form');
const addForm = document.querySelector('#add-popup-form');
const changeAvatarForm = document.querySelector('#change-avatar-popup-form');

const changeAvatarButton = document.querySelector('.profile__avatar-change-btn');