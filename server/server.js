const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'static' });
});

let players = [];
let rooms = [];

io.on('connection', (socket) => {
    console.log('${socket.id} user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
    socket.on('join room', (room, name) => {
        const player = {
            id: socket.id,
            name: name,
            room: room,
            team: null,
            role: null
        };
        
        players.push(player);
        
        if (!rooms.includes(room)) {
            rooms.push(room);
        }
        
        socket.join(room);
        io.to(room).emit('update players', players);
        });

    socket.on('join team', (team, role) => {
        const player = players.find(p => p.id === socket.id);
        player.team = team;
        player.role = role;
        io.to(player.room).emit('update players', players);
    });

})  ;

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

