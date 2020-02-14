import { Inject, Injectable } from '@angular/core';
import { EventType, IMessage, Message, Room } from '@ng-nest-chat/api-interfaces';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../core/services';

@Injectable()
export class ChatService {
  private _messages: Observable<Message>;
  private _userCount: Observable<number>;
  private _currentRoom: Observable<Room>;

  constructor(@Inject(WebsocketService) private readonly websocketService: WebsocketService) {
    this._messages = this.websocketService.listenToEvent<Message>(EventType.Message);
    this._userCount = this.websocketService.listenToEvent<number>(EventType.UpdateCount);
    this._currentRoom = this.websocketService.listenToEvent<Room>(EventType.JoinRoom);
  }

  public get messages(): Observable<Message> {
    return this._messages;
  }

  public get userCount(): Observable<number> {
    return this._userCount;
  }

  public get currentRoom(): Observable<Room> {
    return this._currentRoom;
  }

  public connect(): void {
    this.websocketService.connect();
  }

  public disconnect(): void {
    this.websocketService.disconnect();
  }

  public sendChat(message: IMessage): void {
    this.websocketService.emitEvent<IMessage>(EventType.Message, message);
  }

  public joinRoom(room: Room): void {
    this.websocketService.emitEvent<Room>(EventType.JoinRoom, room);
  }

  public leaveRoom(room: Room): void {
    this.websocketService.emitEvent<Room>(EventType.LeaveRoom, room);
  }
}
