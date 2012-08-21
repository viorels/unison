
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
  socket.on('message', message);

  socket.emit('other_searches', searches);

  function search(data) {
    console.log(data);
    searches.push(data.keywords)
    socket.emit('other_search', { keywords: data.keywords });
    socket.broadcast.emit('other_search', { keywords: data.keywords });

    socket.emit('unison', {});
  }

  function message(data) {
    console.log(data);
    nickname = data.nickname || 'anonymous';
    socket.broadcast.emit('message', { nickname: nickname, message: data.message });
  }
}
