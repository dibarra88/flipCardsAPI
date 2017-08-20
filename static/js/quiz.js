var api = axios.create()
var err = document.querySelector('#error');

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}

function getQuestion(deckId) {
    api.get('/api/decks/' + deckId + '/flipCard').then(function (resp) {
        loadQuestion(resp.data.question)
    })
}
function loadQuestion(data) {
    let q = document.querySelector("#f1_card");
    let btnContainer = document.querySelector('#btn_container');
    let temp = `<div class="front face"><p>${data.question}</p></div>
    <div class="back face center"><p>${data.answer}</p></div></div>`
    q.innerHTML = temp;
    let t = `<input type="hidden" id="deckId" value="${data.deckId}" />
                <input type="hidden" id="cardId" value="${data.cardId}" />`
    btnContainer.innerHTML += t;
}
document.getElementById('btn_container').addEventListener('click', function (e) {
    e.preventDefault()
    var target = e.target;
    let deckId = document.getElementById('deckId').value;
    let cardId = document.getElementById('cardId').value;
    if(target.id === "flip_content"){
        document.getElementById('f1_card').classList.toggle('flip');
    }
    if (target.id === "correct") {
        storeResult(true, deckId, cardId);
    }
    if (target.id === "incorrect") {
        storeResult(false, deckId, cardId);
    }
})
function storeResult(result, deckId, cardId) {
    let url = '/api/decks/' + deckId + '/storeResult/' + cardId;
    api.post(url, {
        correct: result
    })
        .then(function (resp) {
            window.location.href = "/quiz/" + deckId;
        })
        .catch(function (error) {
            let temp = `<div class="alert alert-danger" role="alert">${error.response.status} ${error.response.statusText}</div>`
            err.innerHTML = temp;
        })
}