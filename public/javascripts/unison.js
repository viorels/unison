
var searchForm = $('form#search_form')
var searchResultsDiv = $('div.search_results')

$(function() {
    initSearch();
});

function initSearch() {
    $('form#search_form').submit(searchSubmit)
}

function searchSubmit() {
    keywords = $('form#search_form').find('input[name="keywords"]').val()
    search(keywords);
    return false;
}

function search(keywords) {
    // search_engine = 'http://www.google.com/search?q=' // no content returned
    search_engine = 'https://duckduckgo.com/?q='
    searchResultsDiv.empty();
    $('<iframe />', {
        name: 'search_results',
        src: search_engine + encodeURIComponent(keywords)
    }).appendTo(searchResultsDiv);
}

var socket = io.connect('http://localhost');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
