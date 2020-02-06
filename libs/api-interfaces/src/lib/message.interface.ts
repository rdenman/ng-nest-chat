import { IUser } from './user.interface';

export interface IMessage {
  from: IUser;
  to: string;
  text: string;
}

export enum EventType {
  Message = 'EVENT_MESSAGE',
  JoinRoom = 'EVENT_JOIN_ROOM',
  LeaveRoom = 'EVENT_LEAVE_ROOM',
  UpdateCount = 'EVENT_UPDATE_USER_COUNT',
}

export interface IEvent<T> {
  event: EventType;
  data?: T;
}
