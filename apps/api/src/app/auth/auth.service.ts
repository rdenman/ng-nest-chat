import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser, JwtPayload, JwtResponse, LoginUserDto } from '@ng-nest-chat/api-interfaces';
import { IUserModel } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UserService) private readonly userService: UserService
  ) {}

  public async validateUserByPassword(attempt: LoginUserDto): Promise<JwtResponse> {
    const user: IUserModel = await this.userService.findOneByEmail(attempt.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch: boolean = await user.checkPassword(attempt.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return this.createJwtPayload(user);
  }

  public async validateUserByToken(payload: JwtPayload): Promise<JwtResponse> {
    const user: IUser = await this.userService.findOneByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  private createJwtPayload(user: IUser): JwtResponse {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt: string = this.jwtService.sign(data);
    return {
      expiresIn: Number(this.configService.get<number>('JWT_EXPIRES_IN', 3600)),
      token: jwt,
    };
  }
}
