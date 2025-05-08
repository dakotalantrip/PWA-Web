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

  //Helper function
  private getCleanedTokenPayload(): any {
    const payload = this.getDecodedToken();
    if (!payload) return null;
  
    return {
      id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      roles: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      exp: payload.exp,
      iss: payload.iss,
      aud: payload.aud
    };
  }

  getUserName(): string | null {
    const user = this.getCleanedTokenPayload();
    if (!user) return null;

    console.log(user.name);
    return user.name;
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

  private getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const cleanedPayload = this.getCleanedTokenPayload();
    if (!cleanedPayload) return false;
  
    console.log(cleanedPayload);
    
    if (cleanedPayload.roles && cleanedPayload.roles.length > 0) {
      if(cleanedPayload.roles.includes('Admin'))
      {
        return true;
      }
    }
  
    return false;
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
