const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Красивое",
    link: "https://picsum.photos/600/600",
  },
];

const popup = document.querySelector(".pop-up");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButton = popup.querySelector(".pop-up__close-button");
const formElement = document.querySelector(".pop-up__form");
const nameInput = formElement.querySelector(".pop-up__input_type_name");
const jobInput = formElement.querySelector(".pop-up__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");

const popupAddCard = document.querySelector(".pop-up_type_add-card");
const listElement = document.querySelector(".cards-grid__list");
const templateElement = document.querySelector(".template");
const closeButtonCard = popupAddCard.querySelector(".pop-up__close-button");
const placeInput = popupAddCard.querySelector(".pop-up__input_type_place");
const linkInput = popupAddCard.querySelector(".pop-up__input_type_link");
const placeName = templateElement.querySelector(".card__caption");
const cardImage = templateElement.querySelector(".card__image");

const openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  popup.classList.add("pop-up_opened");
};

const closePopup = function () {
  popup.classList.remove("pop-up_opened");
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup();
}

const openAddCardPopup = function () {
  popupAddCard.classList.add("pop-up_opened");
};
const closeAddCardPopup = function () {
  popupAddCard.classList.remove("pop-up_opened");
};

const addCard = function (element) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".card__caption").textContent = element.name;
  newCard.querySelector(".card__image").alt = element.name;
  newCard.querySelector(".card__image").src = element.link;
  addListeners(newCard);
  return newCard;
};

function cardSubmitHandler(e) {
  e.preventDefault();
  const element = {
    name: "",
    link: "",
  };
  element.name = placeInput.value;
  element.link = linkInput.value;
  const newCard = addCard(element);
  listElement.prepend(newCard);
  placeInput.value = "";
  linkInput.value = "";
  closeAddCardPopup();
}

initialCards.forEach((element) => {
  const newCard = addCard(element);
  listElement.append(newCard);
});

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

addButton.addEventListener("click", openAddCardPopup);
closeButtonCard.addEventListener("click", closeAddCardPopup);

popupAddCard.addEventListener("submit", cardSubmitHandler);

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
}
