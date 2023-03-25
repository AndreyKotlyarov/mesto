import "../pages/index.css";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { validationConfig } from "../scripts/validation-config.js";
import Api from "../scripts/components/Api";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

import {
  formAddCard,
  buttonOpenPopupProfile,
  buttonOpenPopupAddCard,
  buttonOpenPopupAvatarEdit,
  formProfileEdit,
  inputName,
  inputJob,
  profileName,
  profileCaption,
  profileAvatar,
  formAvatarEdit,
} from "../scripts/consts.js";
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "1d40ed4d-cd27-430d-8004-90612a813f32",
    "Content-Type": "application/json",
  },
});

let currentUserId;

Promise.all([api.getCurrentUser(), api.getInitialCards()])
  .then(([currentUser, cards]) => {
    profileName.textContent = currentUser.name;
    profileCaption.textContent = currentUser.about;
    profileAvatar.src = currentUser.avatar;
    currentUserId = currentUser._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(".pop-up_type_open-image");
popupWithImage.setEventListeners();

function createCard(item) {
  const card = new Card(
    item,
    ".template",
    currentUserId,
    {
      handleCardClick: () => {
        popupWithImage.open(item);
      },
    },
    {
      handleLikeClick: (id, isLiked, card) => {
        if (isLiked) {
          api
            .deleteLike(id)
            .then((result) => {
              card.setLikesCounter(result.likes.length);
              card.checkLike(result.likes);
              card.isLiked = false;
              card.handleLike();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .setLike(id)
            .then((result) => {
              card.setLikesCounter(result.likes.length);
              card.checkLike(result.likes);
              card.isLiked = true;
              card.handleLike();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    {
      handleDeleteClick: () => {
        popupDelete.open(item);
      },
    }
  );

  return card.generateCard();
}

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".cards-grid__list"
);

const popupNewCard = new PopupWithForm(".pop-up_type_add-card", {
  handleFormSubmit: (item) => {
    popupNewCard.renderLoading(true);
    api
      .postCard(item.link, item.name)
      .then((result) => cardList.addItem(createCard(result)))
      .then(() => popupNewCard.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupNewCard.renderLoading(false, "Создать"));
  },
});
popupNewCard.setEventListeners();

const popupDelete = new PopupWithConfirmation(".pop-up_type_confirm", {
  handleSubmit: () => {
    card.removeCard();
  },
});
popupDelete.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__caption",
  avatarSelector: ".profile__avatar",
});

const popupProfile = new PopupWithForm(".pop-up_type_edit-profile", {
  handleFormSubmit: (item) => {
    popupProfile.renderLoading(true);
    api
      .patchUserProfile(item.input_type_name, item.input_type_job)
      .then((result) => userInfo.setUserInfo(result))
      .then(() => popupProfile.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupProfile.renderLoading(false, "Сохранить"));
  },
});
popupProfile.setEventListeners();

const popupAvatarEdit = new PopupWithForm(".pop-up_type_avatar-update", {
  handleFormSubmit: (item) => {
    popupAvatarEdit.renderLoading(true);
    api
      .patchUserAvatar(item.link)
      .then((result) => userInfo.setUserInfo(result))
      .then(() => popupAvatarEdit.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatarEdit.renderLoading(false, "Сохранить"));
  },
});
popupAvatarEdit.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.userName;
  inputJob.value = userData.userJob;
  popupProfile.open();
});

buttonOpenPopupAddCard.addEventListener("click", () => {
  popupNewCard.open();
  cardFormValidator.disableButton();
});

buttonOpenPopupAvatarEdit.addEventListener("click", () => {
  popupAvatarEdit.open();
  avatarFormValidator.disableButton();
});

const editFormValidator = new FormValidator(validationConfig, formProfileEdit);
const cardFormValidator = new FormValidator(validationConfig, formAddCard);
const avatarFormValidator = new FormValidator(validationConfig, formAvatarEdit);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
