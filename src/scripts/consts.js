const popupAddCard = document.querySelector(".pop-up_type_add-card");
const formAddCard = popupAddCard.querySelector(".pop-up__form_type_add-card");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");
const buttonOpenPopupAvatarEdit = document.querySelector(".profile__avatar-button");

const formProfileEdit = document.querySelector(".pop-up__form_type_edit-profile");
const inputName = formProfileEdit.querySelector(".pop-up__input_type_name");
const inputJob = formProfileEdit.querySelector(".pop-up__input_type_job");

const formAvatarEdit = document.querySelector(".pop-up__form_type_avatar-update");

const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");
const profileAvatar = document.querySelector(".profile__avatar");

export {
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
};
