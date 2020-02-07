import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRoomDto, IRoom } from '@ng-nest-chat/api-interfaces';
import { IRoomDocument } from './room.schema';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(@Inject(RoomService) private readonly roomService: RoomService) {}

  @Post()
  public async create(@Body() dto: CreateRoomDto): Promise<IRoom> {
    const created: IRoomDocument = await this.roomService.create(dto);
    const { createdBy, name }: IRoomDocument = created;
    return { createdBy, name, messages: [] };
  }

  @Get()
  public async findAll(): Promise<IRoom[]> {
    return await this.roomService.findAll();
  }
}
