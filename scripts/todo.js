const TODOS = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Погулять c собакой",
  "Разобраться в замыканиях",
  "Решить задачу на Codewars",
];

const listElement = document.querySelector(".app__list");
const formElement = document.querySelector(".app__form");
const inputElement = formElement.querySelector(".app__input");
const templateElement = document.querySelector(".template");
const submitButtonElement = document.querySelector(".app__submit-btn");

let editedElement = null;

function handleSubmit(e) {
  e.preventDefault();

  const text = inputElement.value;
  inputElement.value = "";

  if (editedElement) {
    editedElement.querySelector(".item__text").textContent = text;
    setAddMode();
  } else {
    const itemElement = createItem(text);
    listElement.prepend(itemElement);
  }
}

function handleDelete(e) {
  const itemElement = e.target.closest(".item");
  itemElement.remove();
}

function handleEdit(e) {
  const itemElement = e.target.closest(".item");
  setEditMode(itemElement);
}

function handleDuplicate(e) {
  const itemElement = e.target.closest(".item");
  const clone = itemElement.cloneNode(true);
  addListeners(clone);
  itemElement.after(clone);
}

function setEditMode(elem) {
  const text = elem.querySelector(".item__text").textContent;
  inputElement.value = text;
  inputElement.focus();

  submitButtonElement.textContent = "Сохранить";
  editedElement = elem;
}

function setAddMode() {
  editedElement = null;
  submitButtonElement.textContent = "Добавить";
}

function addListeners(element) {
  element
    .querySelector(".item__btn_type_delete")
    .addEventListener("click", handleDelete);

  element
    .querySelector(".item__btn_type_edit")
    .addEventListener("click", handleEdit);

  element
    .querySelector(".item__btn_type_duplicate")
    .addEventListener("click", handleDuplicate);
}

function createItem(text) {
  const newItemElement = templateElement.content.cloneNode(true);
  newItemElement.querySelector(".item__text").textContent = text;
  addListeners(newItemElement);
  return newItemElement;
}

TODOS.forEach((text) => {
  const itemElement = createItem(text);
  listElement.prepend(itemElement);
});

formElement.addEventListener("submit", handleSubmit);
