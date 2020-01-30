import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, IUser } from '@ng-nest-chat/api-interfaces';
import { IUserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<IUser> {
    const created: IUserDocument = await this.userService.create(dto);
    const { email, display }: IUser = created;
    return { email, display };
  }

  @Get('test')
  @UseGuards(AuthGuard())
  public testAuthRoute(): any {
    return { message: 'wowo so cool!' };
  }
}
