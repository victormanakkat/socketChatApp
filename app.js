var express = require('express');

var app = require('express').createServer(),
    io = require('socket.io').listen(app),
    nicknames = [];
app.listen(process.env.VMC_APP_PORT || 1337, null);

app.use("/ui", express.static(__dirname + '/ui'));
app.get('/', function (req, res)
{
    res.sendfile(__dirname + '/ui/index.html');
});

io.sockets.on('connection', function (socket)
{
    socket.on('nickname', function (data, callback)
    {
        if(nicknames.indexOf(data) != -1)
        {
            callback(false);
        }
        else
        {
            callback(true);
            nicknames.push(data);
            socket.nickname = data;
            console.log('Nicknames are ' + nicknames);
            io.sockets.emit('nicknames', nicknames);
        }
    });
    socket.on('user message', function (data)
    {
        io.sockets.emit('user message',
        {
            nick: socket.nickname,
            message: data
        });
    });
    socket.on('disconnect', function ()
    {
        if(!socket.nickname) return;
        if(nicknames.indexOf(socket.nickname) > -1)
        {
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        }
        console.log('Nicknames are ' + nicknames);
        io.sockets.emit('nicknames', nicknames);
    });
});