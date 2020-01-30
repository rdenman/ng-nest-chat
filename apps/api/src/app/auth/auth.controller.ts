import { Body, Controller, Inject, Post } from '@nestjs/common';
import { JwtResponse, LoginUserDto } from '@ng-nest-chat/api-interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() dto: LoginUserDto): Promise<JwtResponse> {
    return await this.authService.validateUserByPassword(dto);
  }
}
