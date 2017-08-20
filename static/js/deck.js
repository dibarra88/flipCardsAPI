var err = document.querySelector('#error')
var deckList = "";
var api = axios.create()

if (window.localStorage.getItem('token')) {
    api.interceptors.request.use(function (config) {
        config.headers['Authorization'] = window.localStorage.getItem('token')
        return config
    })
}
function getDecks() {
    api.get('/api/decks/all').then(function (resp) {
        loadDecks(resp.data.decks)
    })
}
function loadDecks(data) {
    let results = document.querySelector("#accordion");
    for (let i = 0; i < data.length; i++) {
        deckList += `<div class="card"><div class="card-header" role="tab" id="heading${data[i].deck.id}">
        <h5 class="mb-0">
            <a id="deck" data-toggle="collapse" data-parent="#accordion" href="#collapse${data[i].deck.id}" aria-expanded="true" aria-controls="collapse${data[i].deck.id}">
            ${data[i].deck.name}
          </a>
        <a href="/addCard/${data[i].deck.id}">Add Card</a>
        <a href="/editDeck/${data[i].deck.id}">Edit</a>
        <a href="/quiz/${data[i].deck.id}">Quiz</a>
        </h5>
    </div>
    <div id="collapse${data[i].deck.id}" class="collapse" role="tabpanel" aria-labelledby="heading${data[i].deck.id}">
    <div class="card-block"><ul class="list-group">`
        for (let j = 0; j < data[i].cards.length; j++) {
            if (data[i].cards[j].id !== null) {
                deckList += `<li class="list-group-item"><span>Question: ${data[i].cards[j].question}</span><span>      Answer: ${data[i].cards[j].answer}</span>
                <a href="/editCard/${data[i].cards[j].id}">Edit</a></li>`
            }
            else{
                deckList += `<li class="list-group-item"><span>There are no cards for this deck.</li>`
            }
        }
        deckList += `</ul></div></div>`
    }
    results.innerHTML += deckList;
}