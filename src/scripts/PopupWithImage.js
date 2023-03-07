import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._image = this._popup.querySelector(".pop-up__image");
    this._imageCaption = this._popup.querySelector(".pop-up__image-caption");
    this._link = link;
    this._name = name;
  }
  open() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageCaption.textContent = this._name;
    super.open();
  }
}
// //Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
