import http from 'http';
import socketIO, { Socket } from 'socket.io';
import Game from './game';
import Player from './entities/player';

const server = http.createServer();
const io = new socketIO.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
}
);

const game = new Game();


io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado');


    const player = addNewPlayerToGame();
    socket.emit('logged', [player.id, game.players]);
    io.emit('newPlayer', (player))

    socket.on('disconnect', () => {
        game.deletePlayerFromGame(player.id)
        io.emit('playerDisconnect', player.id);
        console.log('Usuario desconectado');
    });
    
    socket.on('keyPressed', (playerKeysData) =>{
        const playerPositionData = game.updatePlayerPosition(playerKeysData.keys, playerKeysData.playerId);
        io.emit('gameDataUpdate', playerPositionData)
    })
});


server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

function randomIdGenerator(n: number): string {
    let id = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < n; i++) {
        const indice = Math.floor(Math.random() * chars.length);
        id += chars.charAt(indice);
    }
    return id;
}

function addNewPlayerToGame(): Player {
    let id = randomIdGenerator(10);
    const newPlayer = game.addNewPlayerToGame(id);
    return newPlayer;
}