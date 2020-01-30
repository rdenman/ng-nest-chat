import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { ApiService } from './services/api.service';
import { WebsocketService } from './socket/websocket.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, AuthService, UserService, WebsocketService],
})
export class CoreModule {}
