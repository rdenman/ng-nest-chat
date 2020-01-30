import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'ng-nest-chat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public createEmail: string;
  public createPassword: string;
  public createDisplay: string;

  public signInEmail: string;
  public signInPassword: string;
  public jwt: string;

  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router
  ) {}

  ngOnInit() {}

  public createAccount() {
    // const creds = { email: this.createEmail, password: this.createPassword, display: this.createDisplay };
    // this.http.post('http://localhost:3000/user', creds).subscribe(res => {
    //   console.log(res);
    // });
  }

  public signIn() {
    // const creds = { email: this.signInEmail, password: this.signInPassword };
    this.authService.login(this.signInEmail, this.signInPassword).subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.router.navigateByUrl('/chat');
      }
    });
  }

  public testRoute() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt);
    // this.http.get('http://localhost:3000/user/test', { headers }).subscribe(res => {
    //   console.log(res);
    // });
  }

  public logout() {
    this.jwt = null;
  }
}
