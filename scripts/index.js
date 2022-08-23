let popup = document.querySelector(".pop-up");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".pop-up__close-button");
let formElement = document.querySelector(".pop-up__form");
let nameInput = formElement.querySelector(".pop-up__input_type_name");
let jobInput = formElement.querySelector(".pop-up__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileCaption = document.querySelector(".profile__caption");

let openPopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  popup.classList.add("pop-up_opened");
};

let closePopup = function () {
  popup.classList.remove("pop-up_opened");
};

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
