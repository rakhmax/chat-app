import mongoose, { Document, Schema } from 'mongoose';

interface IRoom extends Document {
  name: string
  owner: string
}

const RoomSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true,
    }
});

RoomSchema.set('toJSON', { virtuals: true });

export default mongoose.model<IRoom>('Room', RoomSchema);
