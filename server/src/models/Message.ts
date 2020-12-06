import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  text: string
  image: string
  room: string
  sender: string
}

const MessageSchema: Schema<IMessage> = new Schema({
    text: String,
    image: String,
    room: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
});

MessageSchema.set('toJSON', { virtuals: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
