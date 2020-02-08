import { IRoom } from '@ng-nest-chat/api-interfaces';
import { Document, Schema, Types } from 'mongoose';

export interface IRoomDocument extends Document, IRoom {}
export interface IRoomModel extends IRoomDocument {
  loadMessages: () => Promise<void>;
}

export const RoomSchema: Schema<IRoomModel> = new Schema<IRoomModel>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
  },
  messages: [
    {
      from: {
        type: Types.ObjectId,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});
