var app = require('express').createServer()
var static = require('node-static');
var jquery = require('jquery');
var io = require('socket.io').listen(app);

var file = new(static.Server);

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(8081);

app.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {
  
  socket.on('response', function(data){
    io.sockets.emit('render', data);
  })
  
  socket.on('webpage', function(data){
    io.sockets.emit('proxy', data);
  })
});