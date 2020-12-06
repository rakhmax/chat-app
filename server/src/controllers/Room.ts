import { Socket } from 'socket.io';

import io from '../app';
import MessageController from './Message';
import Room from '../models/Room';

class RoomController {
    socket: Socket

    constructor(socket: Socket) {
        this.socket = socket;

        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.join = this.join.bind(this);
        this.leave = this.leave.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async create(data: any) {
        const { name, owner } = data;
        const { socket } = this;

        if (socket.rooms.has(name)) {
            socket.emit('create', {
                msg: {
                    type: 'error',
                    text: 'Комната с таким именем уже есть'
                }
            });
            console.log('Exists', socket.rooms);
        } else {
            const room = { name, owner };

            socket.emit('create', {
                room,
                msg: {
                    type: 'success',
                    text: `Комната ${name} создана`
                }
            });

            try {
                let newRoom = await Room.create(room);
                newRoom = newRoom.toJSON();

                io.sockets.emit('rooms', {
                    id: newRoom.id,
                    name: newRoom.name,
                    owner: newRoom.owner,
                    msg: {
                        status: 'created',
                        type: 'success',
                        text: `Комната ${name} создана`
                    }
                });

                socket.join(name);
            } catch (e) {
                socket.emit('create', {
                    msg: {
                        type: 'error',
                        text: 'Комната с таким именем уже есть'
                    }
                });
            }

            socket.join(name);
        }
    };

    async remove(data: any) {
        const { id, name } = data;
        const { socket } = this;

        try {
            let removedRoom = await Room.findByIdAndDelete(id).exec();
            removedRoom = removedRoom.toJSON();

            socket.to(removedRoom.name).emit('leave', {
                msg: `Комната ${removedRoom.name} была удалена`
            });


            io.sockets.emit('rooms', {
                id: removedRoom.id,
                name: removedRoom.name,
                owner: removedRoom.owner,
                msg: {
                    status: 'deleted',
                    type: 'success',
                    text: `Комната ${name} успешно удалена`
                }
            });

        } catch (e) {
            socket.emit('remove', {
                msg: {
                    type: 'error',
                    text: 'Комнаты с таким именем нет'
                }
            });
        }

        socket.leave(name);
    };

    async getAll() {
        let rooms = await Room.find({});
        const { socket } = this;

        let arr = [];

        for (const room of rooms) {
            const r = room.toJSON();
            const clientsInRoom = await io.in(r.name).sockets.allSockets();

            arr.push({
                ...r,
                online: clientsInRoom.size
            });
        }

        socket.emit('rooms', arr);
    }

    async join(data: any) {
        const { socket } = this;

        if (data.room) {
            const roomname = data.room.name;

            socket.rooms.clear();
            socket.join(roomname);

            const clientsInRoom = await io.in(roomname).sockets.allSockets();

            if (data.room.owner === data.user)
                socket.to(roomname).emit('join', data);

            const { getAll } = new MessageController(socket);
            await getAll(roomname);

            io.emit('change-online', {
                name: roomname,
                online: clientsInRoom.size
            });
        }
    }

    async leave(data: any) {
        const { socket } = this;

        if (data.room) {
            const roomname = data.room.name;

            socket.leave(roomname);

            const clientsInRoom = await io.in(roomname).sockets.allSockets();

            socket.to(roomname).emit('leave', roomname);

            io.emit('change-online', {
                name: roomname,
                online: clientsInRoom.size
            });
        }
    }
}

export default RoomController;
