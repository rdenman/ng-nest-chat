import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtResponse, LoginUserDto, User } from '@ng-nest-chat/api-interfaces';
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

    const payload: JwtResponse = this.createJwtPayload(user);
    return user.addToken(payload.token).then(_ => {
      return payload;
    });
  }

  public async validateUserByToken(payload: JwtPayload, token: string): Promise<JwtResponse> {
    const user: User = await this.userService.findOneByToken(payload.email, token);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  private createJwtPayload(user: User): JwtResponse {
    const data: JwtPayload = {
      email: user.email,
      display: user.display,
      _id: user._id,
    };
    const jwt: string = this.jwtService.sign(data);
    return {
      expiresIn: Number(this.configService.get<number>('JWT_EXPIRES_IN')),
      token: jwt,
    };
  }
}
