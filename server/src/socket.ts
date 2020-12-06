import { Socket } from 'socket.io';

import { MessageController, RoomController } from './controllers';

const initSockets = (socket: Socket) => {
    const { save, getAll: getMessages } = new MessageController(socket);
    const { create, remove, getAll, join, leave } = new RoomController(socket);

    socket.emit('connections', console.log('A user connected'));
    socket.on('disconnect', () => console.log('A user disconnected'));

    socket.on('rooms', async () => await getAll());
    socket.on('create', async (data: any) => await create(data));
    socket.on('remove', async (data: any) => await remove(data));
    socket.on('join', async (data: any) =>  await join(data));
    socket.on('leave', async (data: any) => await leave(data));

    socket.on('messages', async (data) => await getMessages(data));
    socket.on('message', async (data: any) => await save(data));
};

export default initSockets;
