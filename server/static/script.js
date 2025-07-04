const socket = io();
console.log('Connected', socket.id);

const blueTeam = []
const redTeam = []
const spyMasters = []
const playerList = []

socket.on('update players', (players) => {
    playerList = players;
    updatePlayers();
}
);

function updatePlayers() {
    for (const player in playerList) {
        if (player.team == 'blue'){
            blueTeam.push(player)
        }
        else {
            redTeam.push(player)
        }
    }
}

