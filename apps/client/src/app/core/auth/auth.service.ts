import { Inject, Injectable } from '@angular/core';
import { JwtResponse, LoginUserDto } from '@ng-nest-chat/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { ApiService, TokenService } from '../services';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ApiService) private readonly api: ApiService,
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public login(email: string, password: string): Observable<boolean> {
    return this.api.post<LoginUserDto, JwtResponse>('/auth', { email, password }).pipe(
      take(1),
      map((jwt: JwtResponse) => {
        this.tokenService.jwt = jwt;
        this.userService.currentUserValue = TokenService.toUser(this.tokenService.token);
        console.log(this.userService.currentUserValue);
        return true;
      }),
      catchError(_ => of(false))
    );
  }

  public logout(): Observable<void> {
    return this.api.post<null, void>('/auth/logout', null).pipe(
      take(1),
      tap(_ => {
        this.tokenService.jwt = null;
        this.userService.currentUserValue = null;
      }),
      catchError(_ => {
        this.tokenService.jwt = null;
        this.userService.currentUserValue = null;
        return of(null);
      })
    );
  }
}
