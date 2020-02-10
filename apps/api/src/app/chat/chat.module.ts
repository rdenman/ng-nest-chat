import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { RoomController } from './room/room.controller';
import { RoomSchema } from './room/room.schema';
import { RoomService } from './room/room.service';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomController],
  providers: [ChatGateway, RoomService],
})
export class ChatModule {}
