import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".pop-up__form");
    this._handleSubmit = handleSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  }

  open(item) {
    super.open();
    this._itemId = item._id;
  }
}
