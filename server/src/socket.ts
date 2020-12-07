import { Socket } from 'socket.io';

import { MessageController, RoomController } from './controllers';

const initSockets = (socket: Socket) => {
  const { save, getAll: getMessages } = new MessageController(socket);
  const {
    create, remove, getAll, join, leave, getUsers,
  } = new RoomController(socket);

  socket.emit('connections', console.log('A user connected'));
  socket.on('disconnect', () => console.log('A user disconnected'));

  socket.on('rooms', async () => getAll());
  socket.on('create', async (data: any) => create(data));
  socket.on('remove', async (data: any) => remove(data));
  socket.on('join', async (data: any) => join(data));
  socket.on('leave', async (data: any) => leave(data));
  socket.on('online', async (data: any) => getUsers(data));

  socket.on('messages', async (data) => getMessages(data));
  socket.on('message', async (data: any) => save(data));
};

export default initSockets;
