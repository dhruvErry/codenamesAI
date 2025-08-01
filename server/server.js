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

function swapColor(game){
    for (let i = 0; i < game.cards.length; i++) {
        const card = game.cards[i];
        if (card.team === 'yellow'){
            card.team = game.redTurn ? 'red' : 'blue';
            if (game.redTurn) {
                game.redLeft++;
            } else {
                game.blueLeft++;
            }
            return
        }
    }
    // return false;
}

io.on('connection', (socket) => {
    console.log(socket.id, 'user connected');

    socket.on('disconnect', function () {
        console.log(socket.id, 'user disconnected'); 
    });
    
    socket.on('join room', (room, name) => {
        // Check if room exists
        if (!rooms.has(room)) {
            // Only create room if player has a proper name (not "Anonymous")
            if (!name || name === "Anonymous") {
                socket.emit('room not found', room);
                return;
            }
            // Create the room
            rooms.set(room, {players: [], cards: [], redTurn: false, clues: [], activeClueIndex: -1, redLeft: -1, blueLeft: -1, yellowClicks: 0});
        }

        // Remove duplicate players
        const player = {
            id: socket.id,
            name: name,
            team: null,
            spy: null
        };

        // Only add player if not already present
        if (!rooms.get(room).players.some(p => p.id === socket.id)) {
            rooms.get(room).players.push(player);
        }
        socket.join(room)

        if (rooms.get(room).cards.length === 0) {
            createGame(room)
        }

        socket.emit('create game', rooms.get(room), player);
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
        
        // Track yellow card clicks (regardless of revealed status)
        if (card.team === 'yellow' && game.yellowClicks < 5) {
            game.yellowClicks++;
            
            // When 5 yellow cards are clicked, convert unrevealed grey cards to yellow
            if (game.yellowClicks === 5) {
                game.cards.forEach(c => {
                    if (c.team === 'grey' && !c.revealed) {
                        c.team = 'yellow';
                    }
                });
            }
        }
        
        card.revealed = true;
        card.rightClicked = false;
        
        if (card.team != (game.redTurn ? 'red' : 'blue')) {
            game.activeClueIndex = null;
        }

        if (card.team === 'red') {
            game.redLeft -= 1;
            if (!game.redTurn) {
                game.redTurn = true;
            }
        } else if (card.team === 'blue') {
            game.blueLeft -= 1;
            if (game.redTurn) {
                game.redTurn = false;
            }
        } else if (card.team === 'grey') {
            swapColor(game)
        } else if (card.team === 'black') {
            // Optionally handle game over logic
        } else {
            game.redTurn = !game.redTurn;
        }
        
        io.to(room).emit('update game', {
            cards: game.cards,
            redTurn: game.redTurn,
            redLeft: game.redLeft,
            blueLeft: game.blueLeft,
            clues: game.clues,
            activeClueIndex: game.activeClueIndex,
            justRevealedIndex,
        });
    });

    socket.on('right clicked', (index) => {
        // const player = players.find(p => p.id === socket.id);
        // const room = rooms.find(r => r.players.find(p => p.id === socket.id).roomName)
        const room = findRoom(socket.id);
        if (!room) return;
        rooms.get(room).cards[index].rightClicked = !rooms.get(room).cards[index].rightClicked;
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

    socket.on('join team', (team, spy) => {
        const room = findRoom(socket.id);
        if (!room) return;
        
        const roomData = rooms.get(room);
        const player = roomData.players.find(p => p.id === socket.id);
        if (!player) return;
        
        // Check if trying to become spymaster
        if (spy === true) {
            const existingSpymasters = roomData.players.filter(p => 
                p.team === team && p.spy === true
            ).length;
            
            if (existingSpymasters > 0) {
                // socket.emit('join team error', 'This team already has a spymaster');
                return;
            }
        }
        
        player.team = team;
        player.spy = spy;
        console.log(player);
        socket.emit('update player', player);
    });

});

function createGame(room) {
    const words = [
        "BIG", "DOCUMENT", "LEATHER", "GLACIER", "CELL", "AXIS", "DAYLIGHT", "FALLS", "JUNIOR", "CORPORATION",
        "DRIVE", "CHILLY", "GUZZLING", "DUMP", "AMBIDEXTROUS", "COMFORTABLE", "CANDY", "DISTANT", "CONTENT", "NUMERIC",
        "GRADE", "DESCRIBES", "CHANNEL", "ESSENCE", "GEOMETRICAL", "LEGION", "CRASHER", "ENEMIES", "HUMANLY", "HOOLIGAN",
        "FREAK", "FIGHTING", "EVEN", "EXCLUSIVE", "DATA", "GANGLAND"
      ];      

    // Randomize team counts - either red:9/blue:8 or red:8/blue:9
    const redStarts = Math.random() < 0.5;
    const teamCounts = {
        red: redStarts ? 9 : 8,
        blue: redStarts ? 8 : 9,
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
            rightClicked: false,
            revealed: false,
            visible: false,
        });
    }
    
    rooms.get(room).cards = generated;
    rooms.get(room).redLeft = redStarts ? 9 : 8;
    rooms.get(room).blueLeft = redStarts ? 8 : 9;
    rooms.get(room).redTurn = redStarts 
}

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});