import { Inject, Injectable } from '@angular/core';
import { CreateUserDto, IUser } from '@ng-nest-chat/api-interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiService, TokenService } from '../services';

@Injectable()
export class UserService {
  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(
    @Inject(ApiService) private readonly api: ApiService,
    @Inject(TokenService) private readonly tokenService: TokenService
  ) {
    const user: IUser = TokenService.toUser(this.tokenService.token);
    console.log(user);
    this.currentUserSubject = new BehaviorSubject<IUser>(user);
  }

  public get currentUser(): Observable<IUser> {
    return this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.getValue();
  }

  public set currentUserValue(user: IUser) {
    this.currentUserSubject.next(user);
  }

  public register(email: string, password: string, display: string): Observable<IUser> {
    return this.api.post<CreateUserDto, IUser>('/user', { email, password, display }).pipe(
      take(1),
      catchError(_ => of(null))
    );
  }
}
