import { Document, model, Schema } from 'mongoose';

import IRoom from '../types/IRoom';

interface IRoomModel extends IRoom, Document {}

const RoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
});

RoomSchema.set('toJSON', { virtuals: true });

export default model<IRoomModel>('Room', RoomSchema);
