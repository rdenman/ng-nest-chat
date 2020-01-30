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

  @SubscribeMessage(EventType.GetCount)
  public async handleGetCount(@ConnectedSocket() client: Socket): Promise<WsResponse<number>> {
    return { event: EventType.GetCount, data: this.connectedUsersCount };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage(EventType.Message)
  public async handleMessage(
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<string>> {
    //.to(message.room)
    client.broadcast.emit(EventType.Message, message.text);
    return { event: EventType.Message, data: message.text };
  }

  @SubscribeMessage(EventType.JoinRoom)
  public async handleJoinRoom(
    @MessageBody() message: IMessage,
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse<string>> {
    client.join(message.room);
    return { event: EventType.JoinRoom, data: 'OK' };
  }

  @SubscribeMessage(EventType.LeaveRoom)
  public handleLeaveRoom(@MessageBody() message: IMessage, @ConnectedSocket() client: Socket): void {
    client.leave(message.room);
  }
}
