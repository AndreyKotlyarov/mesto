const profilePopup = document.querySelector(".pop-up_type_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButton = profilePopup.querySelector(".pop-up__close-button");
const editProfileForm = document.querySelector(
  ".pop-up__form_type_edit-profile"
);
const nameInput = editProfileForm.querySelector(".pop-up__input_type_name");
const jobInput = editProfileForm.querySelector(".pop-up__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");

const popupAddCard = document.querySelector(".pop-up_type_add-card");
const popupImage = document.querySelector(".pop-up_type_open-image");
const listElement = document.querySelector(".cards-grid__list");
const templateElement = document.querySelector(".template");
const closeCardButton = popupAddCard.querySelector(".pop-up__close-button");
const addCardForm = popupAddCard.querySelector(".pop-up__form_type_add-card");
const placeInput = popupAddCard.querySelector(".pop-up__input_type_place");
const linkInput = popupAddCard.querySelector(".pop-up__input_type_link");
const imageSrc = document.querySelector(".pop-up__image");
const imageCaption = document.querySelector(".pop-up__image-caption");

const popup = document.querySelectorAll(".pop-up");
const closeButtons = document.querySelectorAll(".pop-up__close-button");

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
}
function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
}

const handleProfile = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  const popup = profilePopup;
  closePopup(popup);
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
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".card__caption").textContent = element.name;
  newCard.querySelector(".card__image").alt = element.name;
  newCard.querySelector(".card__image").src = element.link;
  addListeners(newCard);
  return newCard;
};

function handleCardSubmit(e) {
  e.preventDefault();
  const element = {
    name: "",
    link: "",
  };
  element.name = placeInput.value;
  element.link = linkInput.value;
  const newCard = addCard(element);
  listElement.prepend(newCard);
  addCardForm.reset();
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

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".pop-up");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

editProfileButton.addEventListener("click", () => openPopup(profilePopup));
addCardButton.addEventListener("click", () => openPopup(popupAddCard));
editProfileForm.addEventListener("submit", handleFormSubmit);
popupAddCard.addEventListener("submit", handleCardSubmit);
