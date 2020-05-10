var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', async (req, res) => {
    res.send('holaaaaa')
});

io.on('connection', async (socket) => {
    console.log('parent connected');
    socket.on('disconnect', () => {
        console.log('parent disconnected');
    });
    socket.on('give reply', async (id) => {
        await new Promise(done => setTimeout(() => done(), 5000));
        console.log('got request');
        console.log(id);
        socket.emit('here is reply', { msg: 'did it', id: id });
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});