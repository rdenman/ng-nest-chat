import { IToken } from './auth.interface';

export interface IUser {
  userId?: string;
  email?: string;
  display?: string;
  password?: string;
  tokens?: IToken[];
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
