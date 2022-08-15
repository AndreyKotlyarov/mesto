let popup = document.querySelector(".pop-up");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = popup.querySelector(".pop-up__close-button");
let togglePopup = function () {
  popup.classList.toggle("pop-up_opened");
};

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

let formElement = document.querySelector(".pop-up__form");
let nameInput = formElement.querySelector("#input_type_name");
let jobInput = formElement.querySelector("#input_type_job");

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__name").textContent = nameInput.value;
  document.querySelector(".profile__caption").textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
