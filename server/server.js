const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT || 8080;

const path = require('path');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
    // res.set('Access-Control-Allow-Origin', '*');
    res.sendFile('index.html', { root: 'static' });
});

const rooms = new Map();

function findRoom(socketID){
    for (const [roomName, roomState] of rooms.entries()){
        if (roomState.players.some(player => player.id === socketID)){
            return roomName;
        }
    }
    return null;
}

io.on('connection', (socket) => {
    console.log(socket.id, 'user connected');

    socket.on('disconnect', function () {
        console.log(socket.id, 'user disconnected'); 
    });
    
    socket.on('join room', (room, name) => {
        // Remove duplicate players
        const player = {
            id: socket.id,
            name: name,
            team: null,
            role: null
        };

        if (!rooms.has(room)) {
            rooms.set(room, {players: [], cards: [], redTurn: true, clues: [], activeClueIndex: -1})
        }
        // Only add player if not already present
        if (!rooms.get(room).players.some(p => p.id === socket.id)) {
        rooms.get(room).players.push(player);
        }
        socket.join(room)

        if (rooms.get(room).cards.length === 0) {
            createGame(room)
        }

        socket.emit('create game', rooms.get(room));
        console.log(rooms.get(room).players);
        // io.to(room).emit('update players', JSON.stringify(players));
    });

    socket.on('card clicked', (index) => {
        const room = findRoom(socket.id);
        if (!room) return;
        const game = rooms.get(room);
        const card = game.cards[index];
        let justRevealedIndex = null;
        if (!card.revealed) {
            justRevealedIndex = index;
        }
        card.revealed = true;
        card.clicked = false;
        if (card.team === 'red') {
            game.redLeft -= 1;
            if (!game.redTurn) {
                game.redTurn = true;
                game.activeClueIndex = null;
            }
        } else if (card.team === 'blue') {
            game.blueLeft -= 1;
            if (game.redTurn) {
                game.redTurn = false;
                game.activeClueIndex = null;
            }
        } else if (card.team === 'grey') {
            game.redTurn = !game.redTurn;
            game.activeClueIndex = null;
        } else if (card.team === 'black') {
            // Optionally handle game over logic
        } else {
            game.redTurn = !game.redTurn;
            game.activeClueIndex = null;
        }
        io.to(room).emit('update game', {
            cards: game.cards,
            redTurn: game.redTurn,
            redLeft: game.redLeft,
            blueLeft: game.blueLeft,
            clues: game.clues,
            activeClueIndex: game.activeClueIndex,
            justRevealedIndex
        });
    });

    socket.on('right clicked', (index) => {
        // const player = players.find(p => p.id === socket.id);
        // const room = rooms.find(r => r.roomName === r.players.find(p => p.id === socket.id).roomName)
        const room = findRoom(socket.id);
        if (!room) return;
        rooms.get(room).cards[index].clicked = !rooms.get(room).cards[index].clicked;
            io.to(room).emit('right clicked', index);
    })

    socket.on('clue', (clue, number) => {
        // const room = rooms.find(r => r.players.find(p => p.id === socket.id))
        const room = findRoom(socket.id);
        rooms.get(room).clues.push({clue: clue, number: number});
        rooms.get(room).activeClueIndex = rooms.get(room).clues.length - 1;
        if (room) {
            io.to(room).emit('clue', clue, number, rooms.get(room).activeClueIndex);
        }
    })

    socket.on('change turn', (team) => {
        const room = findRoom(socket.id);
        if (!room) return;
        const game = rooms.get(room);
        game.redTurn = (team === 'red');
        game.activeClueIndex = null;
        io.to(room).emit('change turn', team);
    });

    // socket.on('join team', (team, role) => {
    //     // const room = rooms.find(r => r.players.find(p => p.id === socket.id))
    //     const room = findRoom(socket.id);
    //     const player = room.players.find(p => p.id === socket.id);
    //     if (player) {
    //         player.team = team;
    //         player.role = role;
    //         io.to(player.room).emit('update players', players);
    //     }
    // });

});

function createGame(room) {
    const words = [
        "ANJEL", "TREE", "BOMB", "CAR", "BOOK", "DOG", "HOUSE", "SUN", "MOON", "FIRE",
        "WATER", "MOUSE", "KEY", "DOOR", "PLANE", "CLOUD", "APPLE", "GOLD", "SALT", "IRON",
        "PAPER", "PHONE", "RING", "SHIP", "FISH"
    ];

    const teamCounts = {
        red: 9,
        blue: 8,
        yellow: 5,
        grey: 2,
        black: 1
    };

    let teams = [];

    for (let color in teamCounts) {
        for (let i = 0; i < teamCounts[color]; i++) {
            teams.push(color);
        }
    }

    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);

    const generated = [];

    for (let i = 0; i < 25; i++) {
        generated.push({
            word: shuffledWords[i],
            team: shuffledTeams[i],
            clicked: false,
            revealed: false,
        });
    }
    rooms.get(room).cards = generated;
}

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});