import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto, IUser } from '@ng-nest-chat/api-interfaces';
import { IUserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<IUser> {
    const created: IUserDocument = await this.userService.create(dto);
    const { email, display }: IUserDocument = created;
    return { email, display };
  }
}
