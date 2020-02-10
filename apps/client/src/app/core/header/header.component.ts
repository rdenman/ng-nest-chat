import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@ng-nest-chat/api-interfaces';
import { AuthService, UserService } from '../auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public userDisplay: string;

  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User) => {
      if (user) {
        this.userDisplay = user.display;
      }
    });
  }

  public logout(): void {
    this.authService.logout().subscribe(_ => {
      this.userDisplay = '';
      this.router.navigateByUrl('/login');
    });
  }
}
