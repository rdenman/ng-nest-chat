import { IUser } from './user.interface';

export interface IMessage {
  from: IUser;
  to: string;
  text: string;
}
