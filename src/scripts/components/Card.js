import PopupWithConfirmation from "./PopupWithConfirmation";

export default class Card {
  constructor(
    data,
    templateSelector,
    currentUserId,
    { handleCardClick },
    { handleApiLike },
    { handleApiDeleteLike },

    { handleApiDeleteCard },
    { handleDeleteClick }
  ) {
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
    this._isLiked = false;
    this._setApiLike = handleApiLike;
    this._deleteApiLike = handleApiDeleteLike;

    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._deleteApiCard = handleApiDeleteCard;
    this._confirmState = false;
    // this._removeCard = this._removeCard.bind(this);
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
    this._setLikesCounter(this._likes.length);
    this._setEventListeners();
    if (!this._isOwner) {
      this._element.querySelector(".card__delete-button").remove();
    }
    this._checkLike(this._likes);
    this._handleLike();
    return this._element;
  };
  // тут удаление-------------------------------------------------------------------------------------------

  _handleDeleteClick() {
    this._handleDeleteClick();
  }

  removeCard() {
    this._deleteApiCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //_______________________________________________________________________________________________________

  // тут лайки-------------------------------------------------------------------------------------------
  _checkLike(likesArray) {
    likesArray.forEach((element) => {
      if (element._id === this._currentUserId) {
        this._isLiked = true;
      }
    });
  }
  _setLikesCounter(value) {
    this._element.querySelector(".card__like-counter").textContent = value;
  }
  _handleLike() {
    if (this._isLiked === true) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
  _handleApiLikes() {
    if (this._isLiked === true) {
      this._deleteApiLike(this._id)
        .then((result) => {
          this._setLikesCounter(result.likes.length);
          this._checkLike(result.likes);
          this._isLiked = false;
          this._handleLike();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._setApiLike(this._id)
        .then((result) => {
          this._setLikesCounter(result.likes.length);
          this._checkLike(result.likes);
          this._isLiked = true;
          this._handleLike();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  //______________________________________________________________________________________________________

  _handleOpenImage() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteClick.bind(this));

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleApiLikes.bind(this));

    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImage();
    });
  }
}
