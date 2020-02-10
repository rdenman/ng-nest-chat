import { IToken } from './auth.interface';

export interface IUser {
  email?: string;
  display?: string;
  password?: string;
  created?: Date;
  updated?: Date;
  tokens?: IToken[];
}

export interface User extends IUser {
  _id: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  display: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
