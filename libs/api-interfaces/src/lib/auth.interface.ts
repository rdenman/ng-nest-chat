export interface JwtPayload {
  readonly email: string;
}

export interface JwtResponse {
  readonly expiresIn: number;
  readonly token: string;
}
