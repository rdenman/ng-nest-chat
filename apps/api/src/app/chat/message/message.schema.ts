import { IMessage } from '@ng-nest-chat/api-interfaces';
import { Document, Schema } from 'mongoose';

export interface IMessageDocument extends Document, IMessage {}
export interface IMessageModel extends IMessageDocument {}

export const MessageSchema: Schema<IMessageModel> = new Schema<IMessageModel>({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
