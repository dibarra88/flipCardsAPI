var loginUser = document.querySelector("#username")
var loginPass = document.querySelector("#password")
var regUser = document.querySelector('#regUsername')
var regPass = document.querySelector('#regPassword')
var loginForm = document.querySelector("#loginForm")
var loginError = document.querySelector('#loginError')
var regForm = document.querySelector('#registerForm')
var regError = document.querySelector('#registerError')

var api = axios.create()

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}

function setHeaders(token) {
    window.localStorage.setItem('token', token)

    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = token
        return config
    })
}

// login event
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    api.post('/api/login', {
        username: loginUser.value,
        password: loginPass.value
    })
    .then(function (resp) {
        setHeaders(resp.data.token)
        window.location.href = "/decks";
    })
    .catch(function (error) {
        let temp = `<div class="alert alert-danger" role="alert">${error.response.data.message}</div>`
        loginError.innerHTML = temp;
    })
})

// register event
regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    api.post('/api/register', {
        username: regUser.value,
        password: regPass.value
    })
    .then(function (resp) {
        setHeaders(resp.data.token)
        window.location.href = "/decks";
    })
    .catch(function (error) {
        let temp = `<div class="alert alert-danger" role="alert">${error.response.data.message}</div>`
        regError.innerHTML = temp;
    })
})

