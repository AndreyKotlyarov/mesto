export class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  generateCard = () => {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__caption").textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  _handleDelete(e) {
    const itemElement = e.target.closest(".card");
    itemElement.remove();
  }
  _handleLike(e) {
    const itemElement = e.target.closest(".card__like-button");
    itemElement.classList.toggle("card__like-button_active");
  }
  _handleOpenImage(e) {
    const itemElement = e.target.closest(".card");
    const cardLink = itemElement.querySelector(".card__image").src;
    const cardCaption = itemElement.querySelector(".card__caption").textContent;
    document.querySelector(".pop-up__image").src = cardLink;
    document.querySelector(".pop-up__image").alt = cardCaption;
    document.querySelector(".pop-up__image-caption").textContent = cardCaption;
    document
      .querySelector(".pop-up_type_open-image")
      .classList.add("pop-up_opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleOpenImage);
  }
}
