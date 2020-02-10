import { Room } from './room.interface';
import { User } from './user.interface';

export interface IMessage {
  from?: User;
  text?: string;
  created?: Date;
  room?: Room;
}

export interface Message extends IMessage {
  _id: string;
}
