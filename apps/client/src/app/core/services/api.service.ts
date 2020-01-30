import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  private readonly base: string = environment.apiUrl;

  constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}${path}`);
  }

  public post<T, V>(path: string, body: T): Observable<V> {
    return this.http.post<V>(`${this.base}${path}`, body);
  }
}
