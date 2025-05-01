import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'auth');
  }

  public exchangeGoogleToken(idToken: string): Observable<{ jwt: string }> {
    return this.post<{ jwt: string }>('exchange-google-token', { idToken });
  }

  public login(username: string, password: string): Observable<{ jwt: string }> {
    return this.post('login', { id: 1, providerID: '', email: username, name: '' });
  }
}
