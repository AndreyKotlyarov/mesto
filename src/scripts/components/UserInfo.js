export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
      userAvatar: this._avatar.src,
    };
  }
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
  }
}
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
// Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
