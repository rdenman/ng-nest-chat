import { Inject, UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { EventType, Message, Room } from '@ng-nest-chat/api-interfaces';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { RoomService } from './room/room.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private connectedUsersCount: number = 0;

  constructor(@Inject(RoomService) private readonly roomService: RoomService) {}

  @UseGuards(WsJwtGuard)
  public handleConnection(): void {
    this.connectedUsersCount++;
    this.server.emit(EventType.UpdateCount, this.connectedUsersCount);
  }

  public handleDisconnect() {
    this.connectedUsersCount--;
    this.server.emit(EventType.UpdateCount, this.connectedUsersCount);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.Message)
  public async handleMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<Message>> {
    this.roomService.addMessage(message);
    client.to(message.room.name).broadcast.emit(EventType.Message, message);
    return { event: EventType.Message, data: message };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.JoinRoom)
  public async handleJoinRoom(
    @MessageBody() room: Room,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<string>> {
    client.join(room.name);
    return { event: EventType.JoinRoom, data: room.name };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.LeaveRoom)
  public handleLeaveRoom(@MessageBody() room: Room, @ConnectedSocket() client: Socket): void {
    client.leave(room.name);
  }
}
