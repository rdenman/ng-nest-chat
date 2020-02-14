import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRoom, Message } from '@ng-nest-chat/api-interfaces';
import { Model } from 'mongoose';
import { IRoomModel } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly Room: Model<IRoomModel>) {}

  // TODO add auth
  public async create(dto: IRoom): Promise<IRoomModel> {
    const created: IRoomModel = new this.Room({ name: dto.name, owner: dto.owner._id });
    return await created.save();
  }

  // TODO add auth, allow query param to load owners or not
  public async findAll(): Promise<IRoomModel[]> {
    return await this.Room.find().populate('messages.from');
  }

  public async find(_id: string): Promise<IRoomModel> {
    return await this.Room.findById(_id).populate('messages.from');
  }

  public async addMessage(message: Message): Promise<IRoomModel> {
    const room: IRoomModel = await this.Room.findById(message.room._id);
    room.messages.push(message);
    return await room.save();
  }
}
