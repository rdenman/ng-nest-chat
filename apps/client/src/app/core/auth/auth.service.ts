import { Inject, Injectable } from '@angular/core';
import { IUser, JwtResponse } from '@ng-nest-chat/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthService {
  constructor(@Inject(ApiService) private readonly api: ApiService) {}

  public login(email: string, password: string): Observable<boolean> {
    return this.api.post<IUser, JwtResponse>('/auth', { email, password }).pipe(
      take(1),
      map((jwt: JwtResponse) => {
        localStorage.setItem('jwt', jwt.token);
        return true;
      }),
      catchError(_ => of(false))
    );
  }
}
