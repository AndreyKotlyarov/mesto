let popup = document.querySelector(".pop-up");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".pop-up__close-button");
// let togglePopup = function () {
//   popup.classList.toggle("pop-up_opened");
// };
let openPopup = function () {
  if (popup.classList.contains("pop-up_opened") === false) {
    popup.classList.add("pop-up_opened");
  }
};

let closePopup = function () {
  if (popup.classList.contains("pop-up_opened") === true) {
    popup.classList.remove("pop-up_opened");
  }
};

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

let formElement = document.querySelector(".pop-up__form");
let nameInput = formElement.querySelector(".pop-up__input_name");
let jobInput = formElement.querySelector(".pop-up__input_job");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector(".profile__name");
  let profileCaption = document.querySelector(".profile__caption");
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener("submit", formSubmitHandler);
