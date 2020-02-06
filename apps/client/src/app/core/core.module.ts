import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService, UserService } from './auth';
import { AuthGuard } from './guards';
import { HeaderComponent } from './header';
import { LOCAL_STORAGE_PROVIDERS } from './injectors';
import { ApiService, TokenService, WebsocketService } from './services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, AuthGuard, AuthService, LOCAL_STORAGE_PROVIDERS, TokenService, UserService, WebsocketService],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
