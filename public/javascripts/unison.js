
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
    var search_engine = 'https://duckduckgo.com/?q='
    searchResultsDiv.empty();
    $('<iframe />', {
        name: 'search_results',
        src: search_engine + encodeURIComponent(keywords)
    }).appendTo(searchResultsDiv);
}

function searchByOther(keywords) {
    otherSearches.append('<li>' + keywords + '</li>');
}

function chatSubmit() {
    var message_input = chatForm.find('input[name="message"]')
    message = message_input.val();
    if (message) {
        message_input.val('');
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