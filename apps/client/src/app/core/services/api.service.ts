import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class ApiService {
  private readonly base: string = environment.apiUrl;

  constructor(
    @Inject(HttpClient) private readonly http: HttpClient,
    @Inject(TokenService) private readonly tokenService: TokenService
  ) {}

  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}${path}`, this.getOptions());
  }

  public post<T, V>(path: string, body: T): Observable<V> {
    return this.http.post<V>(`${this.base}${path}`, body, this.getOptions());
  }

  private getOptions(): { headers?: HttpHeaders } {
    const options: { headers?: HttpHeaders } = { headers: new HttpHeaders() };
    const token: string = this.tokenService.token;
    if (token) {
      options.headers = options.headers.set('Authorization', `Bearer ${token}`);
    }
    return options;
  }
}
