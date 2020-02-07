import { Inject, Injectable } from '@angular/core';
import { CreateRoomDto, IRoom } from '@ng-nest-chat/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ApiService } from '../../core/services';

@Injectable()
export class RoomService {
  constructor(@Inject(ApiService) private readonly api: ApiService) {}

  public create(room: CreateRoomDto): Observable<IRoom> {
    return this.api.post<CreateRoomDto, IRoom>('/room', room).pipe(
      take(1),
      catchError(_ => of(null))
    );
  }

  public findAll(): Observable<IRoom[]> {
    return this.api.get<IRoom[]>('/room').pipe(
      take(1),
      catchError(_ => of([]))
    );
  }
}
