import { Socket } from 'socket.io';

import io from '../app';
import MessageController from './Message';

import Message from '../models/Message';
import Room from '../models/Room';
import IRoom, { IClientRoom } from '../types/IRoom';

class RoomController {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;

    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async create(data: IRoom) {
    const { name } = data;
    const { socket } = this;

    if (socket.rooms.has(name)) {
      socket.emit('create', {
        msg: {
          type: 'error',
          text: 'Комната с таким именем уже есть',
        },
      });
      console.log('Exists', socket.rooms);
    } else {
      try {
        let newRoom = await Room.create(data);
        newRoom = newRoom.toJSON();

        socket.emit('create', {
          room: data,
          msg: {
            type: 'success',
            text: `Комната ${name} создана`,
          },
        });

        io.sockets.emit('rooms', {
          name: newRoom.name,
          owner: newRoom.owner,
          msg: {
            status: 'created',
            type: 'success',
            text: `Комната ${name} создана`,
          },
        });

        socket.join(name);
      } catch (e) {
        socket.emit('create', {
          msg: {
            type: 'error',
            text: 'Комната с таким именем уже есть',
          },
        });
      }

      socket.join(name);
    }
  }

  async remove(data: IRoom) {
    const { name } = data;
    const { socket } = this;

    try {
      let removedRoom = await Room.findOneAndDelete({ name }).exec();
      removedRoom = removedRoom.toJSON();

      await Message.deleteMany({ room: name }).exec();

      socket.to(removedRoom.name).emit('leave', {
        msg: `Комната ${removedRoom.name} была удалена`,
      });

      io.sockets.emit('rooms', {
        id: removedRoom.id,
        name: removedRoom.name,
        owner: removedRoom.owner,
        msg: {
          status: 'deleted',
          type: 'success',
          text: `Комната ${name} успешно удалена`,
        },
      });
    } catch (e) {
      socket.emit('remove', {
        msg: {
          type: 'error',
          text: 'Комнаты с таким именем нет',
        },
      });
    }

    socket.leave(name);
  }

  async getAll() {
    const rooms = await Room.find({});
    const { socket } = this;

    const arr = [];
    const promises = [];

    for (const room of rooms) {
      const r = room.toObject();
      const clientsInRoom = await io.in(r.name).sockets.allSockets();
      promises.push(io.in(r.name).sockets.allSockets());

      delete r.__v;
      delete r._id;

      arr.push({
        ...r,
        online: clientsInRoom.size,
      });
    }

    socket.emit('rooms', arr);
  }

  async join(data: IClientRoom) {
    const { socket } = this;

    if (data.room && data.user) {
      const roomname = data.room.name;

      socket.rooms.clear();
      socket.join(roomname);

      try {
        const member = await Room.findOneAndUpdate({ name: roomname, 'members.name': data.user.name }, {
          $set: { 'members.$.online': true },
        }).exec();

        if (!member) {
          await Room.findOneAndUpdate({ name: roomname }, {
            $addToSet: { members: { name: data.user.name, online: true } },
          }).exec();
        }

        const clientsInRoom = await io.in(roomname).sockets.allSockets();

        if (data.room.owner === data.user.name) { socket.to(roomname).emit('join', data); }

        const { getAll } = new MessageController(socket);
        await getAll(roomname);

        await this.getUsers(data.room);

        io.emit('change-online', {
          name: roomname,
          online: clientsInRoom.size,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async leave(data: IClientRoom) {
    const { socket } = this;

    if (data.room) {
      const roomname = data.room.name;

      socket.leave(roomname);

      try {
        await Room.updateOne({ name: roomname, 'members.name': data.user.name }, {
          $set: { 'members.$.online': false },
        }).exec();

        const clientsInRoom = await io.in(roomname).sockets.allSockets();

        await this.getUsers(data.room);

        io.emit('change-online', {
          name: roomname,
          online: clientsInRoom.size,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getUsers(data: IRoom) {
    const { socket } = this;

    try {
      let room = await Room.findOne({ name: data.name });
      room = room.toObject();

      socket.emit('online', room.members);
    } catch (error) {
      console.log(error);
    }
  }
}

export default RoomController;
