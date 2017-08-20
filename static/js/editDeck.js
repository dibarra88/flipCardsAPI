var api = axios.create()
var form = document.querySelector('#editDeckForm')
var delForm = document.querySelector('#deleteForm')
var addForm = document.querySelector('#addDeckForm')
var err = document.querySelector('#error')

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}
function getDeck(deckId) {
    if (deckId !== undefined){
        api.get('/api/decks/' + deckId).then(function (resp) {
            document.getElementById('deckName').value = resp.data.deck[0].name;
        })
    }
}
// update deck
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let name = document.querySelector('#deckName').value;
    let deckId = document.querySelector('#deckId').value;
    api.put('/api/decks/' + deckId, {
        name: name
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
    let deckId = document.querySelector('#deckId').value;
    api.delete('/api/decks/' + deckId)
        .then(function (resp) {
            window.location.href = "/decks";
        })
        .catch(function (error) {
            let temp = `<div class="alert alert-danger" role="alert">${error.response.status} ${error.response.statusText}</div>`
            err.innerHTML = temp;
        })
})

