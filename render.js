import { LikesUser } from "./Like.js";
import { renderLogin } from "./loginPage.js";

import { ReplyToСomment } from "./Reply.js";

export function CommentsSample({ Comments }) {
  let isAuth = false

  const appHTML = document.getElementById("app")

  const formHTML = `
  <div class="add-form">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="input-name" value="" />
  <textarea type="textarea" class="add-form-text" id="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    value=""></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-form-button">Написать</button>
  </div>
  </div>
  `

  // const ListElement = document.getElementById("comments")
  const CommentsHTML = Comments.map((comment, index) => {
    return `<li class="comment" id="comment">
    <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text" data-index="${index}">
    ${comment.text}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
    <span class="likes-counter" id="LikesCounter">${comment.likes}</span>
    <button class="like-button ${comment.isLiked ? '-active-like' : ""}" id="LikeButton" data-index="${index}"></button>
    </div>
    </div>
    </li>`
  }).join('');

  appHTML.innerHTML = formHTML

  appHTML.innerHTML = `
  <div class="loading" id="loading">Комментарии загружаются...</div>
  <ul class="comments" id="comments">
  ${CommentsHTML}
  </ul>
  ${isAuth ? formHTML : '<button id="auth">Авторизоваться</button>'}
  `
  const authButton = document.getElementById("auth")
  authButton.addEventListener("click", () => {
    renderLogin();
  })


  // ListElement.innerHTML = CommentsHTML

  LikesUser();
  ReplyToСomment({ Comments });
}

export function Autorization() {
  if (isAuth) return
  const AuthBtn = document.querySelector(".auth")
  AuthBtn.addEventListener('click', () => {
      isAuth = true;
      CommentsSample(Comments)
  })
}



