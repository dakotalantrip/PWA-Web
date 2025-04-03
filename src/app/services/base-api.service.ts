import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiService {
  protected apiUrl: string = 'api'; // Base API URL

  constructor(protected httpClient: HttpClient, controller: string) {
    this.apiUrl = `${this.apiUrl}/${controller}`;
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
