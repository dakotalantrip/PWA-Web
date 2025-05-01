import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor() { }

  public hasValidToken(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp > now) {
        return token;
      } else {
        // Token expired
        return null;
      }
    } catch {
      return null;
    }
  }

  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  login(token: string) {
    localStorage.setItem('accessToken', token);
    this.loggedIn$.next(true); // Update observable to "logged in"
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.loggedIn$.next(false); // Update observable to "logged out"
  }
}
