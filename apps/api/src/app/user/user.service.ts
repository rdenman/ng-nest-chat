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

  public async findOne(_id: string): Promise<IUserModel | null> {
    return await this.User.findById(_id);
  }

  public async findOneByEmail(email: string): Promise<IUserModel | null> {
    return await this.findOneBy(email);
  }

  public async findOneByToken(email: string, token: string): Promise<IUserModel | null> {
    return await this.findOneBy(email, token);
  }

  private async findOneBy(email: string, token?: string): Promise<IUserModel | null> {
    const conditions: { email: string; 'tokens.token'?: string; 'tokens.access'?: 'auth' } = { email };
    if (token) {
      conditions['tokens.token'] = token;
      conditions['tokens.access'] = 'auth';
    }
    const user: IUserModel = await this.User.findOne(conditions);
    return user || null;
  }
}
