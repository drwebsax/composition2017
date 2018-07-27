
var connect = require('connect');
var ejs = require('ejs');
var fs = require('fs');
var socketio = require('socket.io');


var roomArray = [];
var server = connect.createServer();

server.use(connect.router(function (app) {

    // GET - /Canvas/:room
    app.get('/', function (request, response) {
        fs.readFile('canvas.htm', 'utf8', function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(ejs.render(data, {
                // room: request.params.room
            }));
        });
    });
    app.get('/', function (request, response) {
        fs.readFile('main.htm', 'utf8', function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(ejs.render(data, {

            }));
        });
    });
}));


server.use(connect.static(__dirname));

server.listen(8080);

var io = socketio.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function (socket) {

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
