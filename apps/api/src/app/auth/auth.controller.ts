import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtResponse, LoginUserDto } from '@ng-nest-chat/api-interfaces';
import { IUserModel } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  @Post()
  public async login(@Body() dto: LoginUserDto): Promise<JwtResponse> {
    return await this.authService.validateUserByPassword(dto);
  }

  @Post('/logout')
  public async logout(@Headers('authorization') authHeader: string = ''): Promise<void> {
    const token: string = authHeader.split('Bearer ')[1];
    if (token) {
      const payload: JwtPayload = this.jwtService.verify(token);
      const user: IUserModel = await this.userService.findOneByToken(payload.email, token);
      if (user) {
        return user.removeToken(token);
      }
    }
  }
}
