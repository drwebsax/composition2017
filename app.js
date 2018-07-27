var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var path    = require('path');

var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

app.use(express.static(path.join(__dirname,"public")));

var port = process.env.PORT || 8358;
http.listen(port, function(){
  //console.log("server on!: http://localhost:8358/");
});


io.on('connection', function(socket){

  socket.on('draw', function (data) {
      io.sockets.emit('line', data);
  });

  socket.on('clear', function (data) {
      io.sockets.emit('clear', data);
  });
  socket.on('start', function (data) {
      io.sockets.emit('start', data);
  });
  socket.on('end', function (data) {
      io.sockets.emit('end', data);
  });
});

server.bind(port, HOST);
