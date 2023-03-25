export default class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    { handleCardClick },
    { handleLikeClick },
    { handleDeleteClick }
  ) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._currentUserId = currentUserId;
    this._isOwner = data.owner._id === this._currentUserId;
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._handleCardClick = handleCardClick.bind(this);
    this.isLiked = false;

    this._handleLikeClick = handleLikeClick;

    this._handleDeleteClick = handleDeleteClick.bind(this);
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
    this.setLikesCounter(this._likes.length);
    this._setEventListeners();
    if (!this._isOwner) {
      this._element.querySelector(".card__delete-button").remove();
    }
    this.checkLike(this._likes);
    this.handleLike();
    return this._element;
  };

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // лайки-------------------------------------------------------------------------------------------
  checkLike() {
    this._likes.forEach((element) => {
      if (element._id === this._currentUserId) {
        this.isLiked = true;
      }
    });
  }
  setLikesCounter(value) {
    this._element.querySelector(".card__like-counter").textContent = value;
  }
  handleLike() {
    if (this.isLiked === true) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
  //______________________________________________________________________________________________________

  _handleOpenImage() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteClick(this._data, this);
    });

    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeClick(this._id, this.isLiked, this);
    });

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImage();
    });
  }
}
