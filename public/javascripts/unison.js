
var searchForm = $('form#search_form')
  , searchResultsDiv = $('div.search_results')
  , otherSearches = $('div.other_searches ul')
  , chatDiv = $('div.chat')
  , chatForm = chatDiv.find('form')
  , chatMessages = chatDiv.find('div.messages');

var socket = io.connect('http://localhost');

$(function() {
    initSearch();
});

function initSearch() {
    searchForm.submit(searchSubmit);
}

function initChat(keywords) {
    chatDiv.show();
    chatForm.submit(chatSubmit);
}

function searchSubmit() {
    var keywords = searchForm.find('input[name="keywords"]').val()
    search(keywords);
    socket.emit('search', { keywords: keywords });
    return false;
}

function search(keywords) {
    var searchEngine = 'https://duckduckgo.com/?q='
    searchResultsDiv.empty();
    $('<iframe />', {
        name: 'search_results',
        src: searchEngine + encodeURIComponent(keywords)
    }).appendTo(searchResultsDiv);
}

function searchByOther(keywords) {
    otherSearches.append('<li>' + keywords + '</li>');
}

function chatSubmit() {
    var messageInput = chatForm.find('input[name="message"]')
    var message = messageInput.val();
    if (message) {
        messageInput.val('');
        chatSend(message);
    };
    return false;
}

function chatSend(message) {
    chatMessage('me', message);
    socket.emit('message', { nickname: '', message: message});
}

function chatReceive(data) {
    chatMessage(data.nickname, data.message);
}

function chatMessage(nickname, message) {
    chatMessages.append('<p>' + nickname + ': ' + message + '</p>');
}

socket.on('other_search', function (data) {
    var keywords = data.keywords;
    searchByOther(keywords);
});

socket.on('other_searches', function (searches) {
    searches.forEach(function (keywords) {
        searchByOther(keywords);
    })
});

socket.on('unison', function (data) {
    initChat();
})

socket.on('message', chatReceive);
