export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add("pop-up_opened");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
  close() {
    this._popup.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
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
