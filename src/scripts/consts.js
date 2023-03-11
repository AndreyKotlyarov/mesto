const popupAddCard = document.querySelector(".pop-up_type_add-card");
const formAddCard = popupAddCard.querySelector(".pop-up__form_type_add-card");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");

const formProfileEdit = document.querySelector(".pop-up__form_type_edit-profile");
const inputName = formProfileEdit.querySelector(".pop-up__input_type_name");
const inputJob = formProfileEdit.querySelector(".pop-up__input_type_job");

export { formAddCard, buttonOpenPopupProfile, buttonOpenPopupAddCard, formProfileEdit, inputName, inputJob };
