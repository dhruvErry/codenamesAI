const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


// const io = require("socket.io")(server, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//             "Access-Control-Allow-Credentials": true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     }
// });

const port = process.env.PORT || 8080;

const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    // res.set('Access-Control-Allow-Origin', '*');
    res.sendFile('index.html', { root: 'static' });
});

let players = [];
let rooms = [];

io.on('connection', (socket) => {
    console.log(socket.id, 'user connected');

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
        io.to(room).emit('update players', JSON.stringify(players));
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