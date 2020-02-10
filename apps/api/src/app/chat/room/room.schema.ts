import { IRoom } from '@ng-nest-chat/api-interfaces';
import { Document, Schema } from 'mongoose';
import { MessageSchema } from '../message/message.schema';

export interface IRoomDocument extends Document, IRoom {}
export interface IRoomModel extends IRoomDocument {}

export const RoomSchema: Schema<IRoomModel> = new Schema<IRoomModel>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [MessageSchema],
  created: {
    type: Date,
    default: Date.now,
  },
});
