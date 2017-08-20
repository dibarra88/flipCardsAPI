var form = document.querySelector('#addForm')
var err = document.querySelector('#error')
var api = axios.create()

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let name = document.querySelector('#deckName').value;
    api.post('/api/decks/', {
        name: name
    })
        .then(function (resp) {
            window.location.href = "/addCard/" +  resp.data.deck.id;
        })
        .catch(function (error) {
            let temp = `<div class="alert alert-danger" role="alert">${error.response.status} ${error.response.statusText}</div>`
            err.innerHTML = temp;
        })
})