var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

var nbVotes0 = 0
var nbVotes1 = 0

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.broadcast.emit('votes0', nbVotes0);
    socket.emit('votes0', nbVotes0);
    socket.broadcast.emit('votes1', nbVotes1);
    socket.emit('votes1', nbVotes1);

    // ajouter un vote
    socket.on('plus1', function (idClique) {
        if(idClique == 0) {
            console.log('plus ' + idClique);
            nbVotes0++
            socket.broadcast.emit('votes0', nbVotes0);
            socket.emit('votes0', nbVotes0);}
        else if(idClique == 1){
            console.log('plus ' + idClique);
            nbVotes1++
            socket.broadcast.emit('votes1', nbVotes1);
            socket.emit('votes1', nbVotes1);
        }
    });	

    // supprimer un vote 
    socket.on('moins1', function (idClique) {
        if(idClique == 0) {
            console.log('moins  ' + idClique);
            nbVotes0--
            socket.broadcast.emit('votes0', nbVotes0);
            socket.emit('votes0', nbVotes0);}
        else if(idClique == 1){
            console.log('moins  ' + idClique);
            nbVotes1--
            socket.broadcast.emit('votes1', nbVotes1);
            socket.emit('votes1', nbVotes1);
        }
    })
    
});

server.listen(5000);