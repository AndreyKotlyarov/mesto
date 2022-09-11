const validationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__submit-button",
  inactiveButtonClass: "pop-up__submit-button_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible",
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  console.log(inputList);
  const button = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      setButtonState(inputList, button, config);
    });
  });
}

function setButtonState(inputList, button, config) {
  const hasErrors = inputList.some((input) => !input.validity.valid);
  if (hasErrors) {
    console.log(button);
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    console.log(forms);
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);
console.log("nichego ne rabotaet");
