import { login, token } from "./api.js";

const setToken = (newToken) => {
    token = newToken;
}

export const renderLogin = () => {
    const appElement = document.getElementById("app")
    const authHTML = `
    <div class="registration" id="registration">
    <input type="text" class="login-input" placeholder="Логин" id="login-input" value="" /> 
    <input type="text" class="password-input" placeholder="Пароль" id="password-input" value="" /> 
    <br> <button class="button" id="login-button">Войти</button> </br>
    <button class="buttonRegistration" id="buttonRegistration">Зарегистрироваться</button>
    </div>
    `

    appElement.innerHTML = authHTML

    const buttonElementLoginPage = document.getElementById("login-button")
    const loginInputElement = document.getElementById("login-input")
    const passwordInputElement = document.getElementById("password-input")

    buttonElementLoginPage.addEventListener('click', () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value
        }).then((responseData) => {
            console.log(responseData)
            setToken(responseData.user.token)
        })
    })

    if (login === "") {
        alert("Введите логин")
    }

    if (login === "") {
        alert("Введите логин")
    }
}

