import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { validationConfig } from "./validation-config.js";
import { FormValidator } from "./FormValidator.js";

const popup = document.querySelectorAll(".pop-up");
const popupProfile = document.querySelector(".pop-up_type_edit-profile");
const popupAddCard = document.querySelector(".pop-up_type_add-card");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const buttonsClosePopup = document.querySelectorAll(".pop-up__close-button");
const formProfileEdit = document.querySelector(
  ".pop-up__form_type_edit-profile"
);
const formAddCard = popupAddCard.querySelector(".pop-up__form_type_add-card");
const inputName = formProfileEdit.querySelector(".pop-up__input_type_name");
const inputJob = formProfileEdit.querySelector(".pop-up__input_type_job");
const inputPlace = formAddCard.querySelector(".pop-up__input_type_place");
const inputLink = formAddCard.querySelector(".pop-up__input_type_link");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
const listElement = document.querySelector(".cards-grid__list");
const submitCardButton = popupAddCard.querySelector(".pop-up__submit-button");

popup.forEach((background) => {
  const modalWindow = background.closest(".pop-up");
  background.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("pop-up")) {
      closePopup(modalWindow);
    }
  });
});

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", checkEscapeKey);
}
function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", checkEscapeKey);
}
function checkEscapeKey(event) {
  if (event.key === "Escape") {
    const modalWindow = document.querySelector(".pop-up_opened");
    closePopup(modalWindow);
  }
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputJob.value;
  closePopup(popupProfile);
}

initialCards.forEach((item) => {
  const card = new Card(item, ".template");
  const newCard = card.generateCard(listElement);
  listElement.append(newCard);
});

function handleCardSubmit(e) {
  e.preventDefault();
  const item = {
    name: "",
    link: "",
  };
  item.name = inputPlace.value;
  item.link = inputLink.value;
  const card = new Card(item, ".template");
  const newCard = card.generateCard(listElement);
  listElement.prepend(newCard);
  formAddCard.reset();
  const popup = popupAddCard;
  closePopup(popup);
}
function disableButton(button) {
  button.disabled = true;
  button.classList.add("pop-up__submit-button_disabled");
}

buttonsClosePopup.forEach((button) => {
  const popup = button.closest(".pop-up");
  button.addEventListener("click", () => closePopup(popup));
});

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(popupProfile);
});
buttonOpenPopupAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  disableButton(submitCardButton);
});
formProfileEdit.addEventListener("submit", handleFormSubmit);
popupAddCard.addEventListener("submit", handleCardSubmit);

const editFormValidator = new FormValidator(validationConfig, formProfileEdit);
const cardFormValidator = new FormValidator(validationConfig, formAddCard);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
