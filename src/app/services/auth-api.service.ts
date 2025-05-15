import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { BaseApiService } from './base-api.service';
import { User } from '../models/authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(httpClient: HttpClient) {
    super(httpClient, 'auth');
  }

  public get user(): User | null {
    return this.userSubject.getValue();
  }

  private set user(value: User | null) {
    this.userSubject.next(value);
  }

  public exchangeGoogleToken(idToken: string): Observable<{ jwt: string }> {
    return this.post<{ jwt: string }>('exchange-google-token', { idToken });
  }

  public getUser(): Observable<User> {
    return this.get<User>('GetUser').pipe(
      tap((value: User) => {
        this.user = value;
      }),
    );
  }

  public login(email: string, password: string): Observable<{ jwt: string }> {
    return this.post('login', { email: email, password: password });
  }

  public register(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
  ): Observable<{ successful: boolean }> {
    return this.post('register', { email: email, password: password, confirmPassword: confirmPassword, name: name });
  }
}
