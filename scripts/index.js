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
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
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

const addCard = function (element) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".card__caption").textContent = element.name;
  newCard.querySelector(".card__image").alt = element.name;
  newCard.querySelector(".card__image").src = element.link;
  listElement.append(newCard);
};

const openAddCardPopup = function () {
  console.log(popupAddCard);
  popupAddCard.classList.add("pop-up_opened");
};
const closeAddCardPopup = function () {
  popupAddCard.classList.remove("pop-up_opened");
};

initialCards.forEach(addCard);

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);

addButton.addEventListener("click", openAddCardPopup);
closeButtonCard.addEventListener("click", closeAddCardPopup);
