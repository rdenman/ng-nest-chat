import { Inject, Injectable } from '@angular/core';
import { EventType, IMessage, Message } from '@ng-nest-chat/api-interfaces';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../core/services';

@Injectable()
export class ChatService {
  private _messages: Observable<Message>;
  private _userCount: Observable<number>;

  constructor(@Inject(WebsocketService) private readonly websocketService: WebsocketService) {
    this._messages = this.websocketService.listenToEvent<Message>(EventType.Message);
    this._userCount = this.websocketService.listenToEvent<number>(EventType.UpdateCount);
  }

  public get messages(): Observable<Message> {
    return this._messages;
  }

  public get userCount(): Observable<number> {
    return this._userCount;
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
}
