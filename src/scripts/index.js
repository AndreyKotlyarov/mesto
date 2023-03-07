import "../pages/index.css";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import { initialCards } from "./initial-cards.js";
import { validationConfig } from "./validation-config.js";

const listElement = document.querySelector(".cards-grid__list");

const popupAddCard = document.querySelector(".pop-up_type_add-card");
const formAddCard = popupAddCard.querySelector(".pop-up__form_type_add-card");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");

const formProfileEdit = document.querySelector(".pop-up__form_type_edit-profile");
const inputName = formProfileEdit.querySelector(".pop-up__input_type_name");
const inputJob = formProfileEdit.querySelector(".pop-up__input_type_job");

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template", {
        handleCardClick: () => {
          const popupWithImage = new PopupWithImage(".pop-up_type_open-image", card._link, card._name);
          popupWithImage.setEventListeners();
          popupWithImage.open();
        },
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  listElement
);
cardList.renderItems();

const popupNewCard = new PopupWithForm(".pop-up_type_add-card", {
  handleFormSubmit: () => {
    const item = {
      name: popupNewCard._form.querySelector(".pop-up__input_type_place").value,
      link: popupNewCard._form.querySelector(".pop-up__input_type_link").value,
    };
    const card = new Card(item, ".template", {
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(".pop-up_type_open-image", card._link, card._name);
        popupWithImage.setEventListeners();
        popupWithImage.open();
      },
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  },
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__caption",
});

const popupProfile = new PopupWithForm(".pop-up_type_edit-profile", {
  handleFormSubmit: () => {
    userInfo.setUserInfo({ inputName, inputJob });
  },
});

popupProfile.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.userName;
  inputJob.value = userData.userJob;
  popupProfile.open();
});

buttonOpenPopupAddCard.addEventListener("click", () => {
  popupNewCard.open();
  cardFormValidator.disableButton();
});

const editFormValidator = new FormValidator(validationConfig, formProfileEdit);
const cardFormValidator = new FormValidator(validationConfig, formAddCard);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
