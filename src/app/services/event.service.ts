import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:44364/api/Events';

  constructor(private http: HttpClient) { }

  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/Add`, event); // Make a POST request to add a new event
  }

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/Get`).pipe(tap(response => {
      console.log(response);
    }));
  }

  public getEvent(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`; // Construct the URL with the event ID
    return this.http.get<Event>(url); // Make a GET request to fetch the event by ID
  }
}
