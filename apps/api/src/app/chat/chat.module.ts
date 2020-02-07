import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { MessageSchema } from './message/message.schema';
import { RoomController } from './room/room.controller';
import { RoomSchema } from './room/room.schema';
import { RoomService } from './room/room.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }, { name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [RoomController],
  providers: [ChatGateway, RoomService],
})
export class ChatModule {}
