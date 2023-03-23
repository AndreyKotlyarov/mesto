import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleCardDelete }, { removeCard }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".pop-up__form");
    this._handleCardDelete = handleCardDelete;
    this._removeCard = removeCard;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleCardDelete(this._itemId);
      this._removeCard(this._elementCard);
      this.close();
    });
  }

  open(item, element) {
    super.open();
    this._itemId = item._id;
    this._elementCard = element;
  }
}
