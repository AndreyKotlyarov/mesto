import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".pop-up__image");
    this._imageCaption = this._popup.querySelector(".pop-up__image-caption");
  }
  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}
// //Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
