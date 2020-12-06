import { Socket } from 'socket.io';

import Message from '../models/Message';

class MessageController {
    socket: Socket

    constructor(socket: Socket) {
        this.socket = socket;

        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    async save(data: any) {
        const { socket } = this;

        try {
            let newMessage = await Message.create(data);
            newMessage = newMessage.toObject();

            delete newMessage._id;
            delete newMessage.__v;

            socket.to(data.room).emit('message', newMessage);
        } catch (e) {

        }
    };

    async getAll(data: any) {
        const { socket } = this;

        let messages = await Message.find({ room: data });

        messages = messages.map(message => {
            const mObj = message.toObject();

            delete mObj.__v;
            delete mObj._id;

            return mObj;
        });

        if (messages.length > 20)
            messages = messages.slice(messages.length - 20);

        socket.emit('messages', messages);
    }
}

export default MessageController;