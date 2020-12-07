import { Document, model, Schema } from 'mongoose';

import IMessage from '../types/IMessage';

interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
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

export default model<IMessageModel>('Message', MessageSchema);
