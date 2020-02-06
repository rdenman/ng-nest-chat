import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { EventType, IMessage } from '@ng-nest-chat/api-interfaces';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private connectedUsersCount: number = 0;

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
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<IMessage>> {
    client.broadcast.emit(EventType.Message, message);
    return { event: EventType.Message, data: message };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.JoinRoom)
  public async handleJoinRoom(
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<string>> {
    // client.join(message.room);
    return { event: EventType.JoinRoom, data: 'OK' };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.LeaveRoom)
  public handleLeaveRoom(@MessageBody() message: IMessage, @ConnectedSocket() client: Socket): void {
    // client.leave(message.room);
  }
}
