export interface JwtPayload {
  readonly userId: string;
  readonly email: string;
  readonly display: string;
}

export interface JwtResponse {
  readonly expiresIn: number;
  readonly token: string;
}

export interface IToken {
  access: 'auth';
  token: string;
}
