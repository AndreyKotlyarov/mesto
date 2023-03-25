import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".pop-up__form");
    this._inputs = this._form.querySelectorAll(".pop-up__input");
    this._getInputValues = this._getInputValues.bind(this);
    this._button = this._form.querySelector(".pop-up__submit-button");
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
    //собирает данные всех полей формы.
  }
  renderLoading(loadingState, text) {
    if (loadingState) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = text;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this.renderLoading(true);
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
    // добавлет обработчик клика иконке закрытия, и добавляет обработчик сабмита формы.
  }
  close() {
    super.close();
    this._form.reset();
    //закрывает попап и сбрасывает форму
  }
}

// Создайте класс PopupWithForm
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
// но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
