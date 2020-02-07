import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from '@ng-nest-chat/api-interfaces';
import { Model } from 'mongoose';
import { IRoomModel } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private readonly Room: Model<IRoomModel>) {}

  public async create(dto: CreateRoomDto): Promise<IRoomModel> {
    const created: IRoomModel = new this.Room(dto);
    return await created.save();
  }

  public async findAll(): Promise<IRoomModel[]> {
    return await this.Room.find();
  }
}
