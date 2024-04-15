import { CommentsSample } from "./render.js";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function fetchGet({ Comments }) {
    const inputNameElement = document.getElementById("input-name")
    const inputTextElement = document.getElementById("add-form-text")
    const loading = document.getElementById('loading')

    return fetch('https://wedev-api.sky.pro/api/v1/ekaterina-zalygina/comments', {
        method: "GET",
        headers: {
            Autorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            if (response.status === 500) {
                throw new Error("Сервер поломался")
            }

            return response.json();

        }).then((responseData) => {
            const appComments = responseData.comments.map((comment) => {

                let myDate = new Date();
                let fullDate = myDate.toLocaleDateString() + ' ' + myDate.toLocaleTimeString()
                myDate.toLocaleDateString();
                myDate.toLocaleTimeString();

                return {
                    name: comment.author.name,
                    date: fullDate,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false
                }
            })
            Comments = appComments
            CommentsSample({ Comments })
            loading.style.display = "none"
            inputTextElement.value = ""
            inputNameElement.value = ""
        }).catch((error) => {
            if (error.message === "Failed to fetch") {
                alert("Сервер поломался, попробуйте позже")
                loading.textContent = "Комментарии не загрузились";
                return
            }
            alert(error.message)
        })
}


export function fetchPost({ name, text, Comments }) {
    const inputNameElement = document.getElementById("input-name")
    const inputTextElement = document.getElementById("add-form-text")
    const buttonElement = document.getElementById("add-form-button");
    const loading = document.getElementById('loading')

    return fetch('https://wedev-api.sky.pro/api/v1/ekaterina-zalygina/comments', {
        method: "POST",
        body: JSON.stringify({
            name,
            text,
            forceError: true
        }),
        headers: {
            Autorization: `Bearer ${token}`
        },
    })
        .then((response) => {

            if (response.status === 400) {
                buttonElement.textContent = ""
                throw new Error("Вы ввели имя короче 3-х символов");
            }
            if (response.status === 500) {
                buttonElement.textContent = ""
                throw new Error("Ошибка сервера");
            }

            if (response.status === 201) {
                return response.json()
            }

        })
        .then((responseData) => {
            return fetchGet({ Comments });
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            inputTextElement.value = " "
            inputNameElement.value = " "
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            loading.style.display = "none";

            if (error.message === "Вы ввели имя короче 3-х символов") {
                alert("Вы ввели имя и комментарий короче 3-х символов")
            }

            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуйте позже")
            }

            if (error.message === "Failed to fetch") {
                buttonElement.textContent = "Написать"
                alert("Отсутствует подключение к интернету, попробуйте позже")
            }
            console.warn(error)
        })
}

export function login(login, password) {

    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    })
}