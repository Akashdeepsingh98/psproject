var app = require('express')();
var http = require('http').createServer(app);


var iochild = require('socket.io-client');
var socketchild1 = iochild.connect('http://localhost:3000/');

socketchild1.on('connect', function () {
    console.log('child connect');
});



var iouser = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


iouser.on('connection', (socketuser) => {
    console.log('a user connected');
    console.log(socketuser.id)
    socketchild1.emit('give reply', socketuser.id);
    socketchild1.on('here is reply', (data) => {
        if(data.id===socketuser.id){
            socketuser.emit('from child', data.msg);
            console.log(data.msg)
        }
    });
    socketuser.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3100, () => {
    console.log('listening on *:3100');
});