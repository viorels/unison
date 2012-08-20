
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    title: 'Unison',
    name: 'Anonymous'
  });
};

/*
 * Socket.io events
 */

var searches = []

exports.connection = function (socket) {
  socket.on('search', search);

  socket.emit('other_searches', searches); // not handled yet on the client

  function search(data) {
    console.log(data);
    socket.broadcast.emit('other_search', { keywords: data.keywords });
  }
}
