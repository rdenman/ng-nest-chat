import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@ng-nest-chat/api-interfaces';
import { Model } from 'mongoose';
import { IUserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly User: Model<IUserModel>) {}

  public async create(dto: CreateUserDto): Promise<IUserModel> {
    const created: IUserModel = new this.User(dto);
    return await created.save();
  }

  public async findOneByEmail(email: string): Promise<IUserModel | null> {
    return await this.User.findOne({ email });
  }
}
