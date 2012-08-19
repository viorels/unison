
var searchForm = $('form#search_form')
var searchResultsDiv = $('div.search_results')
var otherSearches = $('ul.other_searches')

var socket = io.connect('http://localhost');

$(function() {
    initSearch();
});

function initSearch() {
    $('form#search_form').submit(searchSubmit)
}

function searchSubmit() {
    var keywords = $('form#search_form').find('input[name="keywords"]').val()
    search(keywords);
    socket.emit('search', { keywords: keywords });
    return false;
}

function search(keywords) {
    // var search_engine = 'http://www.google.com/search?q=' // no content returned
    var search_engine = 'https://duckduckgo.com/?q='
    searchResultsDiv.empty();
    $('<iframe />', {
        name: 'search_results',
        src: search_engine + encodeURIComponent(keywords)
    }).appendTo(searchResultsDiv);
}

socket.on('other_search', function (data) {
    var keywords = data.keywords
    otherSearches.append('<li>' + keywords + '</li>')
});
