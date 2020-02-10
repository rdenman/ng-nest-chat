import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRoomDto, Room } from '@ng-nest-chat/api-interfaces';
import { IRoomDocument } from './room.schema';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(@Inject(RoomService) private readonly roomService: RoomService) {}

  @Post()
  public async create(@Body() dto: CreateRoomDto): Promise<Room> {
    const created: IRoomDocument = await this.roomService.create(dto);
    created.populate('owner');
    const { _id, owner, name }: IRoomDocument = created;
    return { _id, owner, name };
  }

  @Get()
  public async findAll(): Promise<Room[]> {
    const rooms: Room[] = await this.roomService.findAll();
    console.log(rooms);
    return rooms;
  }
}
