import { fetchGet, fetchPost, login } from "./api.js";
import { LikesUser } from "./Like.js";
import { CommentsSample } from "./render.js";
import { ReplyToСomment } from "./Reply.js";

// "use strict";
const buttonElement = document.getElementById("add-form-button");
const ListElement = document.getElementById("comments")
const inputNameElement = document.getElementById("input-name")
const inputTextElement = document.getElementById("add-form-text")
const TimeElement = document.getElementById("Time")
const LikeButtons = document.querySelectorAll("like-button")
const LikesCounter = document.getElementById("likes-counter")
const loading = document.getElementById('loading')
const buttonElementLoginPage = document.getElementById("login-button")
const loginInputElement = document.getElementById("login-input")
const passwordInputElement = document.getElementById("password-input")
let isAuth = false

let Comments = []


fetchGet({ Comments })

const jsonComments = JSON.stringify(Comments);
console.log(jsonComments)

CommentsSample({ Comments });

ReplyToСomment({ Comments })

buttonElement.addEventListener("click", () => {

    inputNameElement.style.backgroundColor = "";
    inputTextElement.style.backgroundColor = "";

    if (inputNameElement.value.trim() === "") {
        inputNameElement.style.backgroundColor = "red";
        return;
    };

    if (inputTextElement.value.trim() === "") {
        inputTextElement.style.backgroundColor = "red";
        return;
    };

    const buttonElement = document.getElementById("add-form-button");

    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется...";


    fetchPost({ name: inputNameElement.value, text: inputTextElement.value, Comments })
    fetchGet({ Comments })
    buttonElement.disabled = false;

})


