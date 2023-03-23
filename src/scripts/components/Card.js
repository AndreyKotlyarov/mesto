export default class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    { handleCardClick },
    { handleDeleteClick } // { removeCard }
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._handleCardClick = handleCardClick.bind(this);
    this._currentUserId = currentUserId;
    this._isOwner = data.owner._id === this._currentUserId;
    this._handleDeleteClick = handleDeleteClick.bind(this);
    // this._deleteCard = deleteCard;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  generateCard = () => {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__caption").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;
    this._setEventListeners();
    if (!this._isOwner) {
      this._element.querySelector(".card__delete-button").remove();
    }
    return this._element;
  };

  _handleDeleteClick() {
    this._handleDeleteClick();
  }

  removeCard() {
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
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteClick.bind(this));
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike.bind(this));
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImage();
    });
  }
}
