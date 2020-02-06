import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtResponse } from '@ng-nest-chat/api-interfaces';
import { Socket } from 'socket.io';
import { AuthService } from '../auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    // TODO should this be taken from header instead?
    const token: string = client.handshake.query.token;

    try {
      // TODO how are exceptions thrown here?
      const payload: JwtPayload = this.jwtService.verify(token);
      const response: JwtResponse = await this.authService.validateUserByToken(payload, token);
      return Boolean(response);
    } catch (e) {
      return false;
    }
  }
}
