export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._handleCardClick = handleCardClick.bind(this);
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    return cardElement;
  }
  generateCard = () => {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__caption").textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _handleOpenImage() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._element.querySelector(".card__delete-button").addEventListener("click", this._handleDelete.bind(this));
    this._element.querySelector(".card__like-button").addEventListener("click", this._handleLike.bind(this));
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImage();
    });
  }
}
