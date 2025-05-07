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

  public login(email: string, password: string): Observable<{ jwt: string }> {
    return this.post('login', { email: email, password: password});
  }

  public register(email: string, password: string, confirmPassword: string, name: string): Observable<{ successful: boolean }> {
    return this.post('register', { email: email, password: password, confirmPassword: confirmPassword, name: name });
  }
}
