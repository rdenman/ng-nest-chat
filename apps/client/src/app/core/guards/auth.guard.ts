import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IUser } from '@ng-nest-chat/api-interfaces';
import { Observable } from 'rxjs';
import { UserService } from '../auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser: IUser = this.userService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
