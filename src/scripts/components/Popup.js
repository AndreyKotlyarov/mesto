export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("pop-up_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".pop-up__close-button").addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("pop-up")) {
        this.close();
      }
    });
  }
}