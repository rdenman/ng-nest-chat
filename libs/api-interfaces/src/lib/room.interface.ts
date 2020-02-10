import { Message } from './message.interface';
import { User } from './user.interface';

export interface IRoom {
  name?: string;
  owner?: User;
  messages?: Message[];
}

export interface Room extends IRoom {
  _id: string;
}

export interface CreateRoomDto {
  name: string;
  owner: User;
}
