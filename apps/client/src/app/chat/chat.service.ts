import { Inject, Injectable } from '@angular/core';
import { EventType, IEvent, IMessage } from '@ng-nest-chat/api-interfaces';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from '../core/socket/websocket.service';

const EVENTS: EventType[] = [EventType.Message, EventType.GetCount, EventType.UpdateCount];

@Injectable()
export class ChatService {
  private _events: Subject<IEvent>;

  constructor(@Inject(WebsocketService) private readonly websocketService: WebsocketService) {}

  public sendChat(text: string, room: string) {
    if (!this._events) {
      this.initialize();
    }
    const message: IMessage = { text, room };
    this._events.next({ event: EventType.Message, data: message });
  }

  public get messages(): Subject<IEvent> {
    if (!this._events) {
      this.initialize();
    }
    return this._events;
  }

  private initialize(): void {
    this._events = this.websocketService.connect(EVENTS).pipe(
      map(
        (response: IEvent): IEvent => {
          return response;
        }
      )
    ) as Subject<IEvent>;
  }
}
