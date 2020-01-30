import { Injectable } from '@angular/core';
import { EventType, IEvent } from '@ng-nest-chat/api-interfaces';
import { Observable, Subject } from 'rxjs';
import { connect } from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebsocketService {
  private subject: Subject<IEvent>;

  public connect(events: EventType[]): Subject<IEvent> {
    if (!this.subject) {
      const token: string = localStorage.getItem('jwt');
      this.subject = this.create(token, events);
    }
    return this.subject;
  }

  private create(token: string, events: EventType[]): Subject<IEvent> {
    const socket: SocketIOClient.Socket = connect(
      environment.apiUrl,
      { query: { token } }
    );

    const observable: Observable<IEvent> = new Observable<IEvent>(function subscribe(subscriber) {
      events.forEach((event: EventType) => {
        socket.on(event, (response: any) => subscriber.next({ event: event, data: response }));
      });
    });

    const observer = {
      next: (event: IEvent) => {
        socket.emit(event.event, event.data);
      },
    };
    // TODO deprecated... fix
    return Subject.create(observer, observable);
  }
}
