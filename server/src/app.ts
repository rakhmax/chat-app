import http from 'http';
import { Server, Socket } from 'socket.io';

import database from './database';
import initSockets from './socket';
import { PORT } from './config';

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

database()
    .then(() => {
        server.listen(PORT, () => {
            console.clear();
            console.log('\x1b[32m%s\x1b[0m', `Server is running in http://localhost:${PORT}`);
        });
    });

io.on('connection', (socket: Socket) => initSockets(socket));

export default io;
