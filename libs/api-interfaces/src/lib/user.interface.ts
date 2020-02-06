import { IToken } from './auth.interface';

export interface IUser {
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
