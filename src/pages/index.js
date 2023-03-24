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
      handleApiLike: () => {
        return api.setLike(item._id);
      },
    },
    {
      handleApiDelete: () => {
        return api.deleteLike(item._id);
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

// const popupDelete = new PopupWithConfirmation(
//   ".pop-up_type_confirm",
//   {
//     handleCardDelete: (id) => {
//       api.deleteCard(id).catch((err) => {
//         console.log(err);
//       });
//     },
//   },
//   {
//     removeCard: () => {
//       console.log(
//         "как здесь вызвать метод удаления каротчки из разметки?? ИЛи не здесь??? а где?"
//       );
//     },
//   }
// );
// popupDelete.setEventListeners();

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
    api
      .postCard(item.link, item.name)
      .then((result) => cardList.addItem(createCard(result)))
      .catch((err) => {
        console.log(err);
      });
  },
});
popupNewCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__caption",
});

const popupProfile = new PopupWithForm(".pop-up_type_edit-profile", {
  handleFormSubmit: (item) => {
    api
      .patchUserProfile(item.input_type_name, item.input_type_job)
      .then((result) => userInfo.setUserInfo(result))
      .catch((err) => {
        console.log(err);
      });
  },
});
popupProfile.setEventListeners();

const popupAvatarEdit = new PopupWithForm(".pop-up_type_avatar-update", {
  handleFormSubmit: (item) => {
    api
      .patchUserAvatar(item.link)
      .then((result) => (profileAvatar.src = result.avatar))
      .catch((err) => {
        console.log(err);
      });
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
