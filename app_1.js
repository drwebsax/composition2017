// 모듈을 추출합니다.
var connect = require('connect');
var ejs = require('ejs');
var fs = require('fs');
var socketio = require('socket.io');

// 변수를 선언합니다.
var roomArray = [];

// 웹 서버를 생성 및 실행합니다.
var server = connect.createServer();

// Router 미들웨어를 사용합니다.
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

// Static 미들웨어를 사용합니다.
server.use(connect.static(__dirname));

// 웹 서버를 실행합니다.
server.listen(8080);

// 소켓 서버를 생성 및 실행합니다.
var io = socketio.listen(server);
io.set('log level', 2);
io.sockets.on('connection', function (socket) {
    // join 이벤트


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
