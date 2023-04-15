import { WebSocketServer } from 'ws';

const PORT = 3000;
const server = new WebSocketServer({ port: 8080 });

server.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data){
        console.log('recived: %s',data);
    });

    ws.send('Conectado wachinn');
});