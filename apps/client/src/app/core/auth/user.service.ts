import { Inject, Injectable } from '@angular/core';
import { CreateUserDto, User } from '@ng-nest-chat/api-interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiService, TokenService } from '../services';

@Injectable()
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    @Inject(ApiService) private readonly api: ApiService,
    @Inject(TokenService) private readonly tokenService: TokenService
  ) {
    const user: User = TokenService.toUser(this.tokenService.token);
    console.log(user);
    this.currentUserSubject = new BehaviorSubject<User>(user);
  }

  public get currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  public set currentUserValue(user: User) {
    this.currentUserSubject.next(user);
  }

  public register(email: string, password: string, display: string): Observable<User> {
    return this.api.post<CreateUserDto, User>('/user', { email, password, display }).pipe(
      take(1),
      catchError(_ => of(null))
    );
  }
}
