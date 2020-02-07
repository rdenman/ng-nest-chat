import { IMessage } from '@ng-nest-chat/api-interfaces';
import { Document, Schema, Types } from 'mongoose';

export interface IMessageDocument extends Document, IMessage {}
export interface IMessageModel extends IMessageDocument {}

export const MessageSchema: Schema<IMessageModel> = new Schema<IMessageModel>({
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
});
