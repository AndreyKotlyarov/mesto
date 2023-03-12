import "../pages/index.css";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { initialCards } from "../scripts/initial-cards.js";
import { validationConfig } from "../scripts/validation-config.js";

import {
  formAddCard,
  buttonOpenPopupProfile,
  buttonOpenPopupAddCard,
  formProfileEdit,
  inputName,
  inputJob,
} from "../scripts/consts.js";

const popupWithImage = new PopupWithImage(".pop-up_type_open-image");
popupWithImage.setEventListeners();

// Код создания экземпляра класса Card повторяется в нескольких обработчиках.
// Вынесите его в отдельную функцию. Функция должна создать экземпляр и вернуть результат метода generateCard.
// Вставка в разметку должна остаться в обработчике формы и в методе render класса Section
function createCard(item) {
  const card = new Card(item, ".template", {
    handleCardClick: () => {
      popupWithImage.open(item);
    },
  });
  return card.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".cards-grid__list"
);
cardList.renderItems();

// Данные из формы должен возвращать специальный метод _getInputValues.
// Должен возвращаться объект данных. Так как метод должен быть защищенным,
// результат метода нужно передавать аргументом в колбэк обработчика отправки формы

const popupNewCard = new PopupWithForm(".pop-up_type_add-card", {
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
  },
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__caption",
});

const popupProfile = new PopupWithForm(".pop-up_type_edit-profile", {
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
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
