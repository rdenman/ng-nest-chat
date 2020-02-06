import { Inject, Injectable } from '@angular/core';
import { EventType } from '@ng-nest-chat/api-interfaces';
import { Observable, Subscriber } from 'rxjs';
import { connect } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class WebsocketService {
  private _socket: SocketIOClient.Socket;

  constructor(@Inject(TokenService) private readonly tokenService: TokenService) {}

  public connect(): void {
    if (!this._socket) {
      const token: string = this.tokenService.token;
      if (!token) {
        throw new Error('Cannot connect to socket without a token.');
      }
      this._socket = connect(
        environment.apiUrl,
        { query: { token } }
      );
    } else {
      console.warn('Connected socket already exists.');
    }
  }

  public disconnect(): void {
    if (this._socket) {
      this._socket.disconnect();
    }
    this._socket = null;
  }

  public emitEvent<T>(eventType: EventType, event: T): void {
    this._socket.emit(eventType, event);
  }

  public listenToEvent<T>(eventType: EventType): Observable<T> {
    return new Observable<T>((subscriber: Subscriber<T>) => {
      this._socket.on(eventType, (response: T) => {
        return subscriber.next(response);
      });
    });
  }
}
