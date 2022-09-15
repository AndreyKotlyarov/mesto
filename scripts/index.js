const popup = document.querySelectorAll(".pop-up");
const popupProfile = document.querySelector(".pop-up_type_edit-profile");
const popupAddCard = document.querySelector(".pop-up_type_add-card");
const popupImage = document.querySelector(".pop-up_type_open-image");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const buttonClosePopup = popupProfile.querySelector(".pop-up__close-button");
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
const templateElement = document.querySelector(".template");

const imageSrc = document.querySelector(".pop-up__image");
const imageCaption = document.querySelector(".pop-up__image-caption");

const submitCardButton = popupAddCard.querySelector(".pop-up__submit-button");

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", checkEscapeKey);
}
function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", checkEscapeKey);
}
function checkEscapeKey(event) {
  popup.forEach((popup) => {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
}

popup.forEach((background) => {
  const modalWindow = background.closest(".pop-up");
  background.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("pop-up")) {
      closePopup(modalWindow);
    }
  });
});

const handleProfile = function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileCaption.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputJob.value;
  closePopup(popupProfile);
}
const openImage = function (e) {
  const itemElement = e.target.closest(".card");
  const cardLink = itemElement.querySelector(".card__image").src;
  const cardCaption = itemElement.querySelector(".card__caption").textContent;
  imageCaption.textContent = cardCaption;
  imageSrc.alt = cardCaption;
  imageSrc.src = cardLink;
  const popup = popupImage;
  openPopup(popup);
};

const addCard = function (element) {
  const newCard = templateElement.content
    .querySelector(".card")
    .cloneNode(true);
  newCard.querySelector(".card__caption").textContent = element.name;
  const cardImage = newCard.querySelector(".card__image");
  cardImage.alt = element.name;
  cardImage.src = element.link;
  addListeners(newCard);
  return newCard;
};

function handleCardSubmit(e) {
  e.preventDefault();
  const element = {
    name: "",
    link: "",
  };
  element.name = inputPlace.value;
  element.link = inputLink.value;
  const newCard = addCard(element);
  listElement.prepend(newCard);
  formAddCard.reset();
  const popup = popupAddCard;
  closePopup(popup);
}

initialCards.forEach((element) => {
  const newCard = addCard(element);
  listElement.append(newCard);
});

function handleDelete(e) {
  const itemElement = e.target.closest(".card");
  itemElement.remove();
}
function handleLike(e) {
  const itemElement = e.target.closest(".card__like-button");
  itemElement.classList.toggle("card__like-button_active");
}

function addListeners(element) {
  element
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDelete);
  element
    .querySelector(".card__like-button")
    .addEventListener("click", handleLike);
  element.querySelector(".card__image").addEventListener("click", openImage);
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
