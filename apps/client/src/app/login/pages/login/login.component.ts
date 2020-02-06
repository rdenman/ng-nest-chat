import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@ng-nest-chat/api-interfaces';
import { AuthService, UserService } from '../../../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean = false;
  public switching: boolean = false;
  public isRegister: boolean = false;
  public message: string = '';

  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(Router) private readonly router: Router,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.message = 'Invalid form.';
      return;
    }

    this.loading = true;
    this.message = '';
    if (this.isRegister) {
      this.register();
    } else {
      this.login();
    }
  }

  public switchMode(): void {
    this.switching = true;
    this.message = '';
    this.isRegister = !this.isRegister;
    this.createForm();
    this.switching = false;
  }

  private login(): void {
    if (this.userService.currentUserValue) {
      this.authService.logout().subscribe(_ => {
        this.performLogin();
      });
    } else {
      this.performLogin();
    }
  }

  private performLogin(): void {
    this.authService
      .login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe((success: boolean) => {
        if (success) {
          this.router.navigateByUrl('/chat');
        } else {
          this.message = 'Unable to login.';
        }
        this.loading = false;
      });
  }

  private register(): void {
    this.userService
      .register(this.form.controls.email.value, this.form.controls.password.value, this.form.controls.display.value)
      .subscribe((user: IUser) => {
        if (user) {
          this.switchMode();
          this.message = 'Registration successful.';
        } else {
          this.message = 'Unable to register.';
        }
        this.loading = false;
      });
  }

  private createForm(): void {
    if (this.isRegister) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        display: ['', Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }
}
