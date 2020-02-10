import { Inject, Injectable } from '@angular/core';
import { CreateRoomDto, Room } from '@ng-nest-chat/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiService } from '../../core/services';

@Injectable()
export class RoomService {
  constructor(@Inject(ApiService) private readonly api: ApiService) {}

  public create(room: CreateRoomDto): Observable<Room> {
    return this.api.post<CreateRoomDto, Room>('/room', room).pipe(
      take(1),
      catchError(_ => of(null))
    );
  }

  public findAll(): Observable<Room[]> {
    return this.api.get<Room[]>('/room').pipe(
      take(1),
      catchError(_ => of([]))
    );
  }
}
