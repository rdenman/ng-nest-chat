import { Inject, Injectable } from '@angular/core';
import { IUser, JwtPayload, JwtResponse } from '@ng-nest-chat/api-interfaces';
import { LOCAL_STORAGE, STORAGE_JWT } from '../injectors';

@Injectable()
export class TokenService {
  private _token: string;
  private _expiresIn: number;

  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

  public static toUser(token: string): IUser {
    if (!token) {
      return null;
    }

    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload: string = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const { email, display }: JwtPayload = JSON.parse(jsonPayload);
    return { email, display };
  }

  public set jwt(jwt: JwtResponse) {
    if (!jwt) {
      this.localStorage.removeItem(STORAGE_JWT);
    } else {
      const json: string = JSON.stringify(jwt);
      this.localStorage.setItem(STORAGE_JWT, json);
    }
    this.getValuesFromStorage();
  }

  public get token(): string {
    if (!this._token) {
      this.getValuesFromStorage();
    }
    return this._token;
  }

  public get expiresIn(): number {
    if (!this._expiresIn) {
      this.getValuesFromStorage();
    }
    return this._expiresIn;
  }

  private getValuesFromStorage(): void {
    const jwt: string = this.localStorage.getItem(STORAGE_JWT);
    if (jwt) {
      const parsed: JwtResponse = JSON.parse(jwt);
      this._token = parsed.token;
      this._expiresIn = parsed.expiresIn;
    } else {
      this._token = null;
      this._expiresIn = null;
    }
  }
}
