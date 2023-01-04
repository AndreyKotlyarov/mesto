function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", checkEscapeKey);
}
function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", checkEscapeKey);
}

function checkEscapeKey(event) {
  if (event.key === "Escape") {
    const modalWindow = document.querySelector(".pop-up_opened");
    closePopup(modalWindow);
  }
}
export { openPopup, closePopup, checkEscapeKey };
