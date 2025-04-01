import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://localhost:44364/api/Events';
  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<
    Event[]
  >([]); // Cache for events to avoid multiple calls

  public events$: Observable<Event[]> = this.eventsSubject.asObservable(); // Expose the observable for components to subscribe to

  public get events(): Event[] {
    return this.eventsSubject.value; // Getter to access the current value of the events in the cache
  }

  public set events(value: Event[]) {
    this.eventsSubject.next(value); // Setter to update the BehaviorSubject with a new array of events
  }

  constructor(private http: HttpClient) {
    this.getEvents().subscribe(); // Preload the events when the service is instantiated to ensure the cache is populated
  }

  // Make a POST request to add a new event
  public addEvent(event: Event): Observable<Event | null> {
    return this.http.post<Event>(`${this.apiUrl}`, event).pipe(
      tap((event: Event) => {
        if (event) {
          // When a new event is added, update the BehaviorSubject with the new list of events
          const currentEvents = this.eventsSubject.value;
          this.events = [...currentEvents, event];
        }
      }),
      catchError((error) => {
        console.error('Error adding event:', error);
        return of(null);
      })
    );
  }

  public deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
          // When an event is deleted, update the BehaviorSubject to remove the deleted event
          this.events = this.events.filter((event) => event.id !== id);
      }),
      catchError((error) => {
        console.error('Error deleting event:', error); // Log the error to the console
        return of(); // Return an empty observable to maintain the observable chain
      })
    );
  }

  public getEvents(): Observable<Event[]> {
    return this.events.length > 0
      ? this.events$
      : this.http.get<Event[]>(`${this.apiUrl}`).pipe(
          tap((response) => {
            this.events = response; // Update the BehaviorSubject with the latest events
          })
        );
  }

  public getEvent(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`; // Construct the URL with the event ID
    return this.http.get<Event>(url); // Make a GET request to fetch the event by ID
  }

  public updateEvent(event: Event): Observable<void> {
    const url = `${this.apiUrl}/Update/${event.id}`;
    return this.http.put<void>(url, event).pipe(
      tap(() => {
        const updatedEvents = this.events.map((value: Event) => (event.id === value.id ? event : value));
        this.events = updatedEvents;
      }),
      catchError((error) => {
        console.error('Error updating event:', error); // Log the error to the console
        return of(); // Return an empty observable to maintain the observable chain
      })
    )
  }
}
