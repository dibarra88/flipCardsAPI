var api = axios.create()
var err = document.querySelector('#error')
var form = document.querySelector('#editCardForm')
var delForm = document.querySelector('#deleteForm')

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}

function getCard(cardId) {
    api.get('/api/decks/card/' + cardId).then(function (resp) {
        document.getElementById('question').value = resp.data.card[0].question;
        document.getElementById('answer').value = resp.data.card[0].answer;
    })
}
// update card
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let question = document.querySelector('#question').value;
    let answer = document.querySelector('#answer').value;
    let cardId = document.querySelector('#cardId').value;
    api.put('/api/decks/card/' + cardId, {
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
// delete deck
delForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let cardId = document.querySelector('#cardId').value;
    api.delete('/api/decks/card/' + cardId)
        .then(function (resp) {
            window.location.href = "/decks";
        })
        .catch(function (error) {
            let temp = `<div class="alert alert-danger" role="alert">${error.response.status} ${error.response.statusText}</div>`
            err.innerHTML = temp;
        })
})