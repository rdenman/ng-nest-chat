import { IMessage } from './message.interface';
import { IUser } from './user.interface';

export interface IRoom {
  createdBy?: IUser;
  messages?: IMessage[];
  name?: string;
}

export interface CreateRoomDto {
  name: string;
  createdBy: string;
}
