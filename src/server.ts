import http from 'http';
import socketIO, { Socket } from 'socket.io';

const server = http.createServer();
const io = new socketIO.Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }}
);

io.on('connection', (socket: Socket) => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});