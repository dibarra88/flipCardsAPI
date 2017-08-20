var api = axios.create()
var err = document.querySelector('#error')
var form = document.querySelector('#addCardForm')

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let question = document.querySelector('#question').value;
    let answer = document.querySelector('#answer').value;
    let deckId = document.querySelector('#deckId').value;
    api.post('/api/decks/' + deckId +'/card', {
        question: question,
        answer: answer
    })
        .then(function (resp) {
            window.location.href = "/decks";
        })
        .catch(function (error) {
            let temp = `<div class="alert alert-danger" role="alert">${error.response.status} ${error.response.statusText}</div>`
            err.innerHTML = temp;
        })
})