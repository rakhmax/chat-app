import http from 'http';
import { Server, Socket } from 'socket.io';
import Koa, { Context, Next } from 'koa';
import path from 'path';

import serve from 'koa-static';
import database from './database';
import initSockets from './socket';
import { PORT } from './config';

const app = new Koa();

const frontendDir = path.join(__dirname, '..', '..', 'client', 'build');

app.use(serve(frontendDir));
app.use(
  async (ctx: Context, next: Next) => serve(frontendDir)(
    Object.assign(ctx, { path: 'index.html' }),
    next,
  ),
);

const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: '*',
  },
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
