export interface IUser {
  email?: string;
  display?: string;
  password?: string;
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
